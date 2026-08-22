import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function createCheckoutSession(priceId: string, userId: string) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      metadata: { user_id: userId },
    });
    return session;
  } catch (error: any) {
    throw new Error(`Stripe checkout error: ${error?.type || 'unknown'} - ${error?.message || 'Unknown error'}`);
  }
}

export async function createSubscription(customerId: string, priceId: string) {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
    return subscription;
  } catch (error: any) {
    throw new Error(`Stripe subscription error: ${error?.type || 'unknown'} - ${error?.message || 'Unknown error'}`);
  }
}

export async function recordUsage(subscriptionItemId: string, quantity: number) {
  try {
    const usageRecord = await stripe.subscriptionItems.createUsageRecord(
      subscriptionItemId,
      {
        quantity,
        timestamp: Math.floor(Date.now() / 1000),
        action: 'increment',
      }
    );
    return usageRecord;
  } catch (error: any) {
    throw new Error(`Stripe usage error: ${error?.type || 'unknown'} - ${error?.message || 'Unknown error'}`);
  }
}

export async function createConnectedAccount(email: string) {
  try {
    const account = await stripe.accounts.create({
      type: 'express',
      email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });
    return account;
  } catch (error: any) {
    throw new Error(`Stripe connect error: ${error?.type || 'unknown'} - ${error?.message || 'Unknown error'}`);
  }
}

export async function createSplitPayment(
  amount: number,
  connectedAccountId: string,
  applicationFeePercent: number
) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      transfer_data: { destination: connectedAccountId },
      application_fee_amount: Math.round(amount * (applicationFeePercent / 100)),
    });
    return paymentIntent;
  } catch (error: any) {
    throw new Error(`Stripe split payment error: ${error?.type || 'unknown'} - ${error?.message || 'Unknown error'}`);
  }
}

export async function handleWebhook(event: Stripe.Event) {
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await fulfillOrder(event.data.object as Stripe.Checkout.Session);
        break;
      case 'invoice.paid':
        await updateSubscriptionStatus(event.data.object as Stripe.Invoice);
        break;
      case 'customer.subscription.deleted':
        await handleCancellation(event.data.object as Stripe.Subscription);
        break;
    }
  } catch (error: any) {
    throw new Error(`Webhook handler error: ${error?.message || 'Unknown error'}`);
  }
}

async function fulfillOrder(session: Stripe.Checkout.Session) {
  console.log('Fulfilling order:', session.id);
}

async function updateSubscriptionStatus(invoice: Stripe.Invoice) {
  console.log('Updating subscription:', invoice.subscription);
}

async function handleCancellation(subscription: Stripe.Subscription) {
  console.log('Handling cancellation:', subscription.id);
}