import { useQuery } from "@tanstack/react-query";
import { getVideoToken, queryKeys } from "../lib/api";
import DrawingOverlay from "../components/DrawingOverlay";

export default function VideoCallPage({
  roomName = "default-room",
}: {
  roomName?: string;
}) {
  const {
    data: token,
    error,
    isPending,
  } = useQuery({
    queryKey: queryKeys.videoToken(roomName),
    queryFn: () => getVideoToken(roomName),
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#1a1a1a",
      }}
    >
      {/* Video Grid Placeholder */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {error ? (
          <div style={{ color: "red" }}>
            Error fetching token: {error.message}
          </div>
        ) : isPending || !token ? (
          <div style={{ color: "white" }}>Fetching Twilio Video token...</div>
        ) : (
          <div style={{ color: "white" }}>
            <p>Token fetched: {token.substring(0, 20)}...</p>
            <p>[TODO: Render Twilio Video Grid here]</p>
          </div>
        )}
      </div>

      {/* Drawing Overlay */}
      <DrawingOverlay roomId={roomName} />
    </div>
  );
}
