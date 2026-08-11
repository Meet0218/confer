import { Request, Response } from "express";
import { AuthRequest } from "../../middleware/auth";
import { createCheckoutSession, handleWebhookEvent } from "./payments.service";
import { commonResponse } from "../../utils/commonResponse";

export const checkout = async (req: AuthRequest, res: Response) => {
  const { plan } = req.body;
  const userId = req.user!.id;

  try {
    const url = await createCheckoutSession(userId, plan);
    res.json(
      commonResponse({ url }, "Checkout session created successfully", 200),
    );
  } catch (err: any) {
    res.status(500).json(commonResponse(null, err.message, 500));
  }
};

export const handleWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];

  try {
    await handleWebhookEvent(req.body, sig as string);
    res.json(
      commonResponse({ received: true }, "Webhook processed successfully", 200),
    );
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    res
      .status(400)
      .json(commonResponse(null, `Webhook Error: ${err.message}`, 400));
  }
};
