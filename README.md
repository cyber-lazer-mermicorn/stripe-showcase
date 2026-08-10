# Stripe Commerce Engine
## Built by Cherry Barton | AI Solutions Engineer

Full-stack commerce with Stripe: Subscriptions, Checkout, and Webhooks.

**Live:** https://stripe-showcase.lazermermicorn.com

---

## What This Demonstrates

### Stripe Checkout
- One-time payments
- Subscriptions
- Payment links

### Stripe Billing
- Subscription management
- Usage-based billing
- Invoice generation

### Stripe Webhooks
- Event handling
- Idempotency
- Error recovery

### Stripe Connect
- Marketplace payments
- Split payments
- Payouts

---

## Tech Stack

- **Framework:** Next.js 14
- **Payments:** Stripe
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

### 3. Webhook Handling
Secure webhook processing with signature verification.

### 4. Customer Portal
Self-service subscription management.

### 5. Invoice Generation
Automatic invoice creation and delivery.

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

// Webhook Handler
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  
  switch (event.type) {
    case 'checkout.session.completed':
      // Handle successful payment
      break;
    case 'invoice.paid':
      // Handle invoice payment
      break;
  }
  
  res.json({received: true});
});
```

---

## Why I Built This

I've integrated Stripe in Commerce AI and other platforms. This repo showcases:

- **Checkout** for one-time payments
- **Billing** for subscriptions
- **Webhooks** for event handling
- **Connect** for marketplace payments

---

## Contact

**Cherry Barton** — cherry@lazermermicorn.com

*AI Solutions Engineer | 9 Production Platforms | Stripe Integration Expert*