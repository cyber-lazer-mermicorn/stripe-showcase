# Architecture

## Overview
Stripe Commerce Engine is a Next.js 15 App Router application demonstrating production-grade Stripe integration patterns.

## Layers

| Layer | Path | Responsibility |
|---|---|---|
| API Routes | `app/api/` | Stripe webhook handlers, checkout session creation |
| Library | `lib/` | Typed Stripe client, helpers, shared utilities |
| Tests | `__tests__/` | Unit and integration tests |
| Config | `.env.example`, `tsconfig.json` | Environment and TypeScript configuration |

## Key patterns

### Checkout Session
All checkout flows go through `lib/stripe.ts` → `stripe.checkout.sessions.create()`. Never call the Stripe SDK directly from a component.

### Webhook Verification
All webhook endpoints call `stripe.webhooks.constructEvent(body, sig, secret)` before processing any event. Unverified events are rejected with 400.

### Money handling
All amounts are in the smallest currency unit (cents for USD). No floating point arithmetic on monetary values.

### Error handling
Stripe errors are caught, typed as `Stripe.errors.StripeError`, and returned as structured JSON — never raw stack traces.

## Environment variables
See `.env.example` for all required variables. Never commit real values.
