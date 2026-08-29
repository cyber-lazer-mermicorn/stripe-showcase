# Stripe Payments Showcase

**What this proves:** Correct Stripe integration patterns — payment intent
lifecycle, verified webhook handling, idempotency keys, and operational receipts.
Every pattern handles the failure path, not just the happy path.

**Portfolio:** [cyber-lazer-mermicorn](https://github.com/cyber-lazer-mermicorn) · Cherry Shanaley

---

## Key patterns

| Pattern | What it proves |
|---|---|
| Payment intent lifecycle | Create → confirm → capture → cancel with status checks |
| Webhook verification | `stripe.webhooks.constructEvent` — signature-verified, not trusted raw |
| Idempotency | `idempotencyKey` on all mutation calls — safe to retry |
| Refund handling | Partial + full refund flows with receipt emission |
| Error boundaries | Stripe error codes mapped to user-facing messages |

## Run locally

```bash
npm install
cp .env.example .env   # add STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET
npm run demo           # runs payment lifecycle demo against Stripe test mode
npm test
```

## Evidence

- Webhook handler rejects requests with invalid signatures — testable with Stripe CLI
- Payment demo emits a structured receipt JSON to console
- Idempotency is exercised by running the same demo twice — second call is a no-op

## Honest scope

Showcase-grade: patterns are correct and safe for Stripe test mode. No production
PCI scope, multi-currency, or subscription billing management included.
