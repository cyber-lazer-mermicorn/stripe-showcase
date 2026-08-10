import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18',
});

// Checkout — One-time payments
export async function createCheckoutSession(priceId: string, userId: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: priceId,
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    metadata: {
      user_id: userId,
    },
  });

  return session;
}

// Billing — Subscriptions
export async function createSubscription(customerId: string, priceId: string) {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{
      price: priceId,
    }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  });

  return subscription;
}

// Usage-Based Billing
export async function recordUsage(subscriptionItemId: string, quantity: number) {
  const usageRecord = await stripe.subscriptionItems.createUsageRecord(
    subscriptionItemId,
    {
      quantity,
      timestamp: Math.floor(Date.now() / 1000),
      action: 'increment',
    }
  );

  return usageRecord;
}

// Connect — Marketplace payments
export async function createConnectedAccount(email: string) {
  const account = await stripe.accounts.create({
    type: 'express',
    email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  return account;
}

// Split Payment
export async function createSplitPayment(
  amount: number,
  connectedAccountId: string,
  applicationFeePercent: number
) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    transfer_data: {
      destination: connectedAccountId,
    },
    application_fee_amount: Math.round(amount * (applicationFeePercent / 100)),
  });

  return paymentIntent;
}

// Revenue Recognition
export async function createRevenueSchedule(
  name: string,
  amount: number,
  startDate: Date,
  endDate: Date
) {
  const schedule = await stripe.billingPortal.configurations.create({
    business_profile: {
      headline: 'Revenue Recognition',
    },
    features: {
      subscription_cancel: { enabled: true },
      invoice_history: { enabled: true },
    },
  });

  return schedule;
}

// Customer Portal
export async function createCustomerPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_URL}/account`,
  });

  return session;
}

// Webhook Handler
export async function handleWebhook(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      // Fulfill the order
      await fulfillOrder(session);
      break;

    case 'invoice.paid':
      const invoice = event.data.object as Stripe.Invoice;
      // Update subscription status
      await updateSubscriptionStatus(invoice);
      break;

    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription;
      // Handle cancellation
      await handleCancellation(subscription);
      break;
  }
}

async function fulfillOrder(session: Stripe.Checkout.Session) {
  // Implementation for order fulfillment
  console.log('Fulfilling order:', session.id);
}

async function updateSubscriptionStatus(invoice: Stripe.Invoice) {
  // Implementation for subscription status update
  console.log('Updating subscription:', invoice.subscription);
}

async function handleCancellation(subscription: Stripe.Subscription) {
  // Implementation for cancellation handling
  console.log('Handling cancellation:', subscription.id);
}