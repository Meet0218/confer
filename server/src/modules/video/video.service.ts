import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;

export function generateVideoToken(roomName: string, identity: string): string {
  if (!accountSid || !authToken || !apiKey || !apiSecret) {
    throw new Error("Missing Twilio configuration");
  }

  const AccessToken = twilio.jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  const token = new AccessToken(accountSid, apiKey, apiSecret, { identity });
  const grant = new VideoGrant({ room: roomName });
  token.addGrant(grant);

  return token.toJwt();
}
