import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import * as paymentsController from "./payments.controller";

export const paymentsRouter = Router();

paymentsRouter.post("/checkout", requireAuth, paymentsController.checkout);

// Note: Stripe webhook needs the raw body to verify signatures.
// The raw body is handled via conditional middleware in app.ts.
paymentsRouter.post("/webhook", paymentsController.handleWebhook);
