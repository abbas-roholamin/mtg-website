'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import CartItem from '@/components/cart/CartItem';
import Wrapper from '@/components/common/Wrapper';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import Section from '@/components/common/Section';
import { useCheckoutMutation } from '@/hooks/use-checkout-mutation';

export default function CartPage() {
  const t = useTranslations('pages');
  const c = useTranslations('checkout');
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotalFinalPrice,
    getTotalPrice,
    clearCart,
    getStripeLineItems,
  } = useCart();
  const { mutate, isPending } = useCheckoutMutation();

  const subtotal = getTotalPrice();
  const finalPrice = getTotalFinalPrice();
  const discount = subtotal - finalPrice;
  const total = subtotal - discount;

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 5);

  const handleIncrement = (product_variation_id: number) => {
    const item = cart.find(
      i => i.product_variation_id === product_variation_id
    );
    if (item) {
      updateQuantity(product_variation_id, item.quantity + 1);
    }
  };

  const handleDecrement = (variationId: number) => {
    const item = cart.find(i => i.product_variation_id === variationId);
    if (item && item.quantity > 1) {
      updateQuantity(variationId, item.quantity - 1);
    }
  };

  const handleRemove = (variationId: number) => {
    removeFromCart(variationId);
  };

  const handleSubmit = () => {
    mutate(
      {
        items: getStripeLineItems(),
        subtotal_amount: subtotal,
        discount_amount: discount,
        total_amount: total,
      },
      {
        onSuccess: ({ data }) => {
          window.location.href = data.checkout_url;
        },
        onError: () => {
          toast.error(c('error'));
        },
      }
    );
  };

  if (cart.length === 0) {
    return (
      <div className="text-muted-foreground flex h-[60vh] items-center justify-center text-2xl font-semibold">
        {t('cart.empty')}
      </div>
    );
  }

  return (
    <Section>
      <Wrapper className="grid grid-cols-1 gap-12 p-6 lg:grid-cols-[1fr_1fr_1.5fr] xl:grid-cols-3 xl:gap-16">
        {/* Cart Items List */}
        <div className="lg:col-span-2 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-b-neutral-200">
          {cart.map(item => (
            <CartItem
              key={item.product_variation_id}
              item={item}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemove}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="grid h-fit gap-6 rounded-3xl border border-neutral-200 p-5 sm:gap-8 sm:p-8">
          <h2 className="font-poppins text-2xl font-bold sm:text-[28px]">
            {t('cart.order_summary')}
          </h2>

          <div className="grid gap-4 text-sm sm:gap-6 sm:text-base">
            <div className="flex justify-between">
              <span>{t('cart.price')}</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>{t('cart.discount')}</span>
              <span>-€{discount.toFixed(2)}</span>
            </div>

            <div className="h-px w-full bg-neutral-200" />

            <div className="flex justify-between text-lg font-semibold">
              <span>{t('cart.total')}</span>
              <span>€{total.toFixed(2)}</span>
            </div>

            <div className="text-muted-foreground flex justify-between text-sm">
              <span>{t('cart.estimated_delivery')}</span>
              <span>{estimatedDate.toLocaleDateString()}</span>
            </div>

            <Button
              className="bg-primary w-full cursor-pointer"
              size={'lg'}
              onClick={handleSubmit}
              disabled={isPending}
            >
              {t('cart.checkout')}
            </Button>

            <Button variant="outline" className="w-full" onClick={clearCart}>
              {t('cart.clear')}
            </Button>
          </div>
        </div>
      </Wrapper>
    </Section>
  );
}
