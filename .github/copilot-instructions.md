# GitHub Copilot Instructions — Stripe Commerce Engine

You are working on a Stripe integration showcase by Cherry Shanaley (AI Solutions Engineer).

## Always
- Use TypeScript with strict types — no `any`
- Wrap Stripe calls in typed try/catch blocks
- Use integer cents for all monetary values
- Verify webhook signatures before processing
- Import Stripe helpers from `lib/` — don't duplicate client setup

## Never
- Log secret keys or webhook signing secrets
- Use `revenueScheduleSchedules` (not a real Stripe API)
- Return untyped Stripe responses — always type or narrow them
- Add placeholder functions with empty bodies

## Code style
- Functional components with explicit return types
- Named exports preferred over default exports in lib/
- Error messages must be human-readable, not raw Stripe error codes

## Test pattern
```typescript
import { describe, it, expect } from 'bun:test';
describe('checkout', () => {
  it('creates a session with valid price id', async () => {
    // arrange, act, assert — no empty tests
  });
});
```
