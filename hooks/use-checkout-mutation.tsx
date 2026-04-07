import { useMutation } from '@tanstack/react-query';
import { Checkout } from '@/types/checkout';
import { ApiResponse } from '@/types/response';

export const useCheckoutMutation = () => {
  return useMutation({
    mutationFn: async (
      payload: Checkout
    ): Promise<ApiResponse<{ checkout_url: string }>> => {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const result = await response.json();
      return result;
    },
  });
};
