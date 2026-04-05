import { z } from 'zod';

export function getCheckoutSchema<T extends (key: string) => string>(t: T) {
  return z.array(
    z.object({
      price_data: z.object({
        product_data: z.object({
          name: z.string().min(1, t('product.name.required')),
          images: z.array(z.string().url()).default([]),
        }),
        currency: z.literal('eur'),
        unit_amount: z.number().int().positive().min(1, t('amount.minimum')),
      }),
      metadata: z.object({
        product_id: z.number(),
        product_variation_id: z.number(),
      }),
      quantity: z.number().int().positive().min(1).default(1),
    })
  );
}
export type StripeLineItem = z.infer<
  ReturnType<typeof getCheckoutSchema>
>[number];
