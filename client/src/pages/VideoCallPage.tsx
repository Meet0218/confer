import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import { getVideoToken, queryKeys } from "../lib/api";
import DrawingOverlay from "../components/DrawingOverlay";

export default function VideoCallPage({
  token = "default-room",
}: {
  token?: string;
}) {
  const { token: routeToken } = useParams();
  const activeCallToken = useMemo(
    () => decodeURIComponent(routeToken ?? token ?? "default-room"),
    [routeToken, token],
  );
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const shareLink = `${window.location.origin}/calls/room/${encodeURIComponent(activeCallToken)}`;

  const {
    data: twilioToken,
    error,
    isPending,
  } = useQuery({
    queryKey: queryKeys.videoToken(activeCallToken),
    queryFn: () => getVideoToken(activeCallToken),
  });

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopyStatus("Link copied to clipboard");
    } catch (err) {
      setCopyStatus("Failed to copy link");
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#1a1a1a",
      }}
    >
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
        ) : isPending || !twilioToken ? (
          <div style={{ color: "white" }}>Fetching Twilio Video token...</div>
        ) : (
          <div style={{ color: "white" }}>
            <p>Token fetched: {twilioToken.substring(0, 20)}...</p>
            <p>[TODO: Render Twilio Video Grid here]</p>
          </div>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          right: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          zIndex: 10,
          color: "white",
        }}
      >
        <div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Room</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{activeCallToken}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Button size="sm" variant="secondary" onClick={copyLink}>
            Copy link
          </Button>
          {copyStatus && (
            <span style={{ fontSize: 12, opacity: 0.9 }}>{copyStatus}</span>
          )}
        </div>
      </div>

      <DrawingOverlay roomId={activeCallToken} />
    </div>
  );
}
