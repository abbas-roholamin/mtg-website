import { NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import { API } from '@/constants/api';

export async function POST(req: Request) {
  const t = await getTranslations('checkout');

  try {
    const body = await req.json();
    const response = await fetch(API.CHECKOUT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.API_ACCESS_KEY!,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: t('field') },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: t('error') }, { status: 500 });
  }
}
