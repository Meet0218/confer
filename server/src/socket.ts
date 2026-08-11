import { Server as SocketIOServer } from "socket.io";
import { Server } from "http";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@confer/shared-types";

export function initSocket(httpServer: Server) {
  const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(
    httpServer,
    {
      cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
      },
    },
  );

  const drawingNamespace = io.of("/drawing");

  drawingNamespace.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on("leave_room", (roomId) => {
      socket.leave(roomId);
      console.log(`Socket ${socket.id} left room ${roomId}`);
    });

    socket.on("drawing", (event) => {
      // Broadcast to everyone in the room EXCEPT the sender
      socket.to(event.roomId).emit("drawing", event);
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
}
