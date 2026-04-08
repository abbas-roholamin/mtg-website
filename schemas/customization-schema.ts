import { z } from 'zod';

export function getCustomizationFormSchema<T extends (key: string) => string>(
  t: T
) {
  return z.object({
    design: z.string().min(1, 'Select a design'),
    note: z.string().optional(),
    images: z.any().optional(),
  });
}

export type CustomizationFormType = z.infer<
  ReturnType<typeof getCustomizationFormSchema>
>;
