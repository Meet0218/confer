import { Response } from "express";
import { AuthRequest } from "../../middleware/auth";
import { Call, CallSummary } from "../../models/index";
import { summarizeCall } from "./calls.service";
import { commonResponse } from "../../utils/commonResponse";

export const createCall = async (req: AuthRequest, res: Response) => {
  const { roomName } = req.body;

  if (!roomName) {
    return res
      .status(400)
      .json(commonResponse(null, "roomName is required", 400));
  }

  const call = await Call.create({
    roomName,
    hostId: req.user!.id,
  });

  res.status(201).json(commonResponse(call, "Call created successfully", 201));
};

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
