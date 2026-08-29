# Stripe Commerce Engine — Agent Doctrine

## What this repo is
Full-stack Stripe integration showcase for Cherry Shanaley (Chan), AI Solutions Engineer.
Demonstrates: Checkout, Billing, Connect, Revenue Recognition on Next.js 15 + Supabase + Vercel.

## Tech stack
- **Framework:** Next.js 15 (App Router)
- **Payments:** Stripe (latest SDK)
- **Database:** Supabase (Postgres)
- **Deployment:** Vercel
- **Language:** TypeScript (strict)
- **Runtime:** Bun + Node

## Coding rules
- TypeScript strict mode — no `any`, no untyped returns
- All Stripe API calls wrapped in try/catch with typed error handling
- Never log or expose Stripe secret keys — use `.env.local` only
- Webhook handlers must verify signature with `stripe.webhooks.constructEvent`
- All money values in cents (integer), never float dollars
- Use `stripe.checkout.sessions.create` patterns from `lib/` — do not duplicate
- Tests live in `__tests__/` — all new features need a test

## Project structure
```
lib/          # Stripe client, helpers, typed wrappers
__tests__/    # Jest/Bun test suite
.env.example  # Required env vars (no real values)
```

## Commands
```bash
npm install       # install deps
npm run dev       # local dev
npm run build     # production build
npm run test      # run tests
npm run lint      # eslint
```

## Do not
- Hand-edit `package-lock.json` or `bun.lock`
- Add new payment providers — Stripe only
- Use `revenueScheduleSchedules` — this is not a real Stripe API; use `stripe.subscriptions` patterns
- Commit real API keys
