import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../lib/api';
import DrawingOverlay from '../components/DrawingOverlay';

export default function VideoCallPage({ roomName = 'default-room' }: { roomName?: string }) {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Note: We need a valid JWT in localStorage for this to work
    fetchWithAuth('/video/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomName }),
    })
      .then((data) => setToken(data.token))
      .catch((err) => setError(err.message));
  }, [roomName]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#1a1a1a' }}>
      {/* Video Grid Placeholder */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {error ? (
          <div style={{ color: 'red' }}>Error fetching token: {error}</div>
        ) : !token ? (
          <div style={{ color: 'white' }}>Fetching Twilio Video token...</div>
        ) : (
          <div style={{ color: 'white' }}>
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
