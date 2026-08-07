import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { generateVideoToken } from '../services/twilio';

export const videoRouter = Router();

videoRouter.post('/token', requireAuth, (req: AuthRequest, res) => {
  const { roomName } = req.body;
  
  if (!roomName) {
    return res.status(400).json({ error: 'roomName is required' });
  }

  // Identity is the user's ID
  const identity = req.user!.id;
  
  try {
    const token = generateVideoToken(roomName, identity);
    res.json({ token });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
