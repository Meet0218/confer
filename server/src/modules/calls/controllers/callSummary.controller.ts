import { Response } from "express";
import { AuthRequest } from "../../../middleware/auth";
import { CallSummary } from "../../../models/index";
import { summarizeCall } from "../services/summarizeCall.service";
import { commonResponse } from "../../../utils/commonResponse";

export const getCallSummary = async (req: AuthRequest, res: Response) => {
  const callId = req.params.id;

  // Check if summary already exists
  let summary = await CallSummary.findOne({ where: { callId } });

  if (!summary) {
    // Note: In a real app, you'd fetch the transcript from somewhere (DB, Twilio, Deepgram).
    // For now we'll pass a stub transcript.
    const dummyTranscript =
      "Hello everyone. Let's talk about the new project. Bob, can you handle the frontend? Yes, I'll do it. Alice, please setup the DB. Got it.";

    try {
      const result = await summarizeCall(dummyTranscript, callId);

      summary = await CallSummary.create({
        callId,
        summaryText: dummyTranscript,
        keyPoints: result.keyPoints,
        actionItems: result.actionItems,
        generatedBy: "claude-sonnet-4-6",
      });
    } catch (err: any) {
      return res
        .status(500)
        .json(
          commonResponse(null, "Failed to summarize call: " + err.message, 500),
        );
    }
  }

  res.json(commonResponse(summary, "Call summary retrieved successfully", 200));
};
