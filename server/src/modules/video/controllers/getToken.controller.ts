import { Response } from "express";
import { AuthRequest } from "../../../middleware/auth";
import { generateVideoToken } from "../video.service";
import { commonResponse } from "../../../utils/commonResponse";
import { Call } from "../../../models";

export const getToken = async (req: AuthRequest, res: Response) => {
  const routeToken = req.params.token;
  const { token } = req.body as { token?: string };
  const callToken = routeToken || token;

  if (!callToken) {
    return res
      .status(400)
      .json(commonResponse(null, "Call token is required", 400));
  }

  // Identity is the user's ID
  const identity = req.user!.id;

  try {
    const call = await Call.findOne({ where: { token: callToken } });
    if (!call) {
      return res.status(404).json(commonResponse(null, "Call not found", 404));
    }

    const twilioToken = generateVideoToken(call.roomName, identity);
    res.json(
      commonResponse(
        {
          token: twilioToken,
          call: {
            id: call.id,
            roomName: call.roomName,
            title: call.title,
            token: call.token,
          },
        },
        "Video token generated successfully",
        200,
      ),
    );
  } catch (err: any) {
    res.status(500).json(commonResponse(null, err.message, 500));
  }
};
