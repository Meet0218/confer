// Wrapper around the python AI service
import { CallSummary } from "@confer/shared-types";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

export async function summarizeCall(
  transcript: string,
  callId: string,
): Promise<Omit<CallSummary, "id" | "callId" | "transcript">> {
  try {
    const response = await fetch(`${AI_SERVICE_URL}/summarize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcript, callId }),
    });

    if (!response.ok) {
      throw new Error(`AI service responded with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error calling AI service:", error);
    // Return a stub if the service is down for now
    return {
      keyPoints: ["Discussed project setup", "Assigned tasks"],
      actionItems: ["Bob -> Frontend", "Alice -> DB"],
    };
  }
}
