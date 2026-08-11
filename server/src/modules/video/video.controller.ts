import { Response } from "express";
import { AuthRequest } from "../../middleware/auth";
import { generateVideoToken } from "./video.service";
import { commonResponse } from "../../utils/commonResponse";

export const getToken = (req: AuthRequest, res: Response) => {
  const { roomName } = req.body;

  if (!roomName) {
    return res
      .status(400)
      .json(commonResponse(null, "roomName is required", 400));
  }

  // Identity is the user's ID
  const identity = req.user!.id;

  try {
    const token = generateVideoToken(roomName, identity);
    res.json(
      commonResponse({ token }, "Video token generated successfully", 200),
    );
  } catch (err: any) {
    res.status(500).json(commonResponse(null, err.message, 500));
  }
};
