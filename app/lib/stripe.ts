import Stripe from "stripe";

// The VPS blocks Node's https module from reaching api.stripe.com, so every
// Stripe call has to go through the fetch client. Retry tuning alone did not fix it.
// Cached so requests reuse one client (avoids the old 504 timeouts).
let _stripe: Stripe | null = null;
export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY — check your server environment variables.");
    _stripe = new Stripe(key, {
      maxNetworkRetries: 1,
      httpClient: Stripe.createFetchHttpClient(),
    });
  }
  return _stripe;
}
