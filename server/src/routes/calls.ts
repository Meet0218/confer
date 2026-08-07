import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { Call, CallSummary } from '../models/index';
import { summarizeCall } from '../services/aiService';

export const callsRouter = Router();

callsRouter.post('/', requireAuth, async (req: AuthRequest, res) => {
  const { roomName } = req.body;
  
  if (!roomName) {
    return res.status(400).json({ error: 'roomName is required' });
  }

  const call = await Call.create({
    roomName,
    hostId: req.user!.id
  });

  res.status(201).json(call);
});

callsRouter.get('/:id/summary', requireAuth, async (req: AuthRequest, res) => {
  const callId = req.params.id;

  // Check if summary already exists
  let summary = await CallSummary.findOne({ where: { callId } });
  
  if (!summary) {
    // Note: In a real app, you'd fetch the transcript from somewhere (DB, Twilio, Deepgram).
    // For now we'll pass a stub transcript.
    const dummyTranscript = "Hello everyone. Let's talk about the new project. Bob, can you handle the frontend? Yes, I'll do it. Alice, please setup the DB. Got it.";
    
    try {
      const result = await summarizeCall(dummyTranscript, callId);
      
      summary = await CallSummary.create({
        callId,
        transcript: dummyTranscript,
        keyPoints: result.keyPoints,
        actionItems: result.actionItems,
        rawResponse: result
      });
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to summarize call: ' + err.message });
    }
  }

  res.json(summary);
});
