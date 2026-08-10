# Stripe Commerce Engine
## Built by Cherry Shanaley (Chan) | AI Solutions Engineer

Full-stack commerce with Stripe: Checkout, Billing, Connect, and Revenue Recognition.

**Live:** https://stripe-showcase.lazermermicorn.com

---

## What This Demonstrates

### Stripe Checkout
- One-time payments
- Subscriptions
- Payment links
- Mobile-optimized

### Stripe Billing
- Subscription management
- Usage-based billing
- Invoice generation
- Customer portal

### Stripe Connect
- Marketplace payments
- Split payments
- Payouts
- Onboarding

### Stripe Revenue Recognition
- Revenue schedules
- Deferred revenue
- ASC 606 compliance
- Financial reporting

---

## Tech Stack

- **Framework:** Next.js 15
- **Payments:** Stripe (latest)
- **Database:** Supabase
- **Deployment:** Vercel

---

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Add your Stripe keys

# Run development
npm run dev
```

---

## Features

### 1. Checkout Flow
One-time payment checkout with Stripe.

### 2. Subscription Management
Recurring billing with multiple tiers.

### 3. Usage-Based Billing
Pay-as-you-go pricing models.

### 4. Customer Portal
Self-service subscription management.

### 5. Revenue Recognition
ASC 606 compliant revenue schedules.

---

## Stripe Integration

```typescript
// Checkout Session
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price: 'price_1234',
    quantity: 1,
  }],
  mode: 'subscription',
  success_url: 'https://example.com/success',
  cancel_url: 'https://example.com/cancel',
});

// Usage-Based Billing
await stripe.subscriptionItems.createUsageRecord(
  'si_1234',
  {
    quantity: 100,
    timestamp: Math.floor(Date.now() / 1000),
    action: 'increment',
  }
);

// Revenue Recognition
const schedule = await stripe.revenueScheduleSchedules.create({
  name: 'Annual Subscription',
  revenue_schedule_items: [{
    amount: 120000,
    currency: 'usd',
    revenue_recognition_rule: 'recognized_ratably',
    start: Math.floor(Date.now() / 1000),
    end: Math.floor(Date.now() / 1000) + 31536000,
  }],
});
```

---

## Why I Built This

I've integrated Stripe in Commerce AI and other platforms. This repo showcases:

- **Checkout** for one-time payments
- **Billing** for subscriptions
- **Connect** for marketplace payments
- **Revenue Recognition** for financial compliance

---

## Contact

**Cherry Shanaley (Chan)** — cyber.lazer.mermicorn@gmail.com

*AI Solutions Engineer | 9 Production Platforms | Stripe Integration Expert*