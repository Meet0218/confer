import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { createCheckoutSession, handleWebhookEvent } from '../services/stripe';

export const paymentsRouter = Router();

paymentsRouter.post('/checkout', requireAuth, async (req: AuthRequest, res) => {
  const { plan } = req.body;
  const userId = req.user!.id;

  try {
    const url = await createCheckoutSession(userId, plan);
    res.json({ url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Note: Stripe webhook needs the raw body to verify signatures.
// The raw body is handled via conditional middleware in app.ts.
paymentsRouter.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    await handleWebhookEvent(req.body, sig as string);
    res.json({ received: true });
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
