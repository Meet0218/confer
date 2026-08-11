import { useEffect, useId, useRef, useState } from "react";
import { drawingSocket } from "../lib/socket";
import type { DrawingEvent } from "@confer/shared-types";

export default function DrawingOverlay({ roomId }: { roomId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const userId = useId(); // Stub user ID

  useEffect(() => {
    drawingSocket.connect();
    drawingSocket.emit("join_room", roomId);

    const onDrawing = (event: DrawingEvent) => {
      // TODO: Render incoming drawing events on the canvas
      console.log("Received drawing event from another user:", event);
    };

    drawingSocket.on("drawing", onDrawing);

    return () => {
      drawingSocket.off("drawing", onDrawing);
      drawingSocket.emit("leave_room", roomId);
      drawingSocket.disconnect();
    };
  }, [roomId]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    emitDrawingEvent("start", e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    emitDrawingEvent("move", e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    emitDrawingEvent("end", e.clientX, e.clientY);
  };

  const emitDrawingEvent = (
    type: "start" | "move" | "end",
    x: number,
    y: number,
  ) => {
    const event: DrawingEvent = {
      roomId,
      userId,
      type,
      point: { x, y },
      color: "#ff0000",
      width: 2,
    };
    drawingSocket.emit("drawing", event);
    // TODO: also draw locally on canvas immediately
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto", // allows drawing
        touchAction: "none", // prevent scrolling on touch
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    />
  );
}
