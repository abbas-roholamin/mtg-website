import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import stripe from '../../../lib/stripe';
import { getCorsHeaders } from '@/utils/cors';

export async function POST(req: Request) {
  // Handle CORS manually
  const origin = req.headers.get('origin');
  const headers = getCorsHeaders(origin);

  // Parse request body
  const { amount } = await req.json();
  // const schema = getContactFormSchema(t);

  try {
    const params: Stripe.Checkout.SessionCreateParams = {
      currency: 'eur',
      line_items: [
        {
          price_data: {
            product_data: {
              name: 'Product',
              // images: [],
              description: 'Description',
            },
            currency: 'eur',
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?session_id={CHECKOUT_SESSION_ID}`,
    };

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, { headers });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        success: false,
        message: `Failed to send message ${err}`,
      },
      { status: 500, headers }
    );
  }
}
