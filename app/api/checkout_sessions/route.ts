import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import stripe from '../../../lib/stripe';
import { getCorsHeaders } from '@/utils/cors';
import { getCheckoutSchema } from '@/schemas/checkout-schema';

export async function POST(req: Request) {
  const t = await getTranslations('checkout');

  // Handle CORS manually
  const origin = req.headers.get('origin');
  const headers = getCorsHeaders(origin);

  try {
    const body = await req.json();

    // Validate the line_items array
    const schema = getCheckoutSchema(t);
    const validation = schema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          message: t('validation_field'),
          errors,
        },
        { status: 400, headers }
      );
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      validation.data;

    const params: Stripe.Checkout.SessionCreateParams = {
      currency: 'eur',
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?session_id={CHECKOUT_SESSION_ID}`,
    };

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, { headers });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to send message ${err}`,
      },
      { status: 500, headers }
    );
  }
}
