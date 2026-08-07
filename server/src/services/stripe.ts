// import Stripe from 'stripe';
import { Payment } from '../models/index';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' });
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function createCheckoutSession(userId: string, plan: string): Promise<string> {
  // TODO: Implement actual Stripe checkout session creation
  console.log(`[STUB] createCheckoutSession for user: ${userId}, plan: ${plan}`);
  return 'https://stub-stripe-checkout-url.com';
}

export async function handleWebhookEvent(rawBody: Buffer | any, signature: string) {
  // TODO: Implement actual Stripe webhook validation and processing
  /*
  const event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // update payments table
  }
  */
  console.log(`[STUB] handleWebhookEvent called`);
}
