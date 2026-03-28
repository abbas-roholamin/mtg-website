'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import CartItem from '@/components/cart/CartItem';
import Wrapper from '@/components/common/Wrapper';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import Section from '@/components/common/Section';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCart();
  const t = useTranslations('pages');

  const [discountRate] = useState(0.1); // 10% discount

  const subtotal = getTotalPrice();
  const discount = subtotal * discountRate;
  const shipping = subtotal > 50 ? 0 : 20;
  const total = subtotal - discount + shipping;

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 5);

  const handleIncrement = (variationId: number) => {
    const item = cart.find(i => i.variationId === variationId);
    if (item) {
      updateQuantity(variationId, item.quantity + 1);
    }
  };

  const handleDecrement = (variationId: number) => {
    const item = cart.find(i => i.variationId === variationId);
    if (item && item.quantity > 1) {
      updateQuantity(variationId, item.quantity - 1);
    }
  };

  const handleRemove = (variationId: number) => {
    removeFromCart(variationId);
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
              key={item.variationId}
              item={item}
              onIncrement={() => handleIncrement(item.variationId)}
              onDecrement={() => handleDecrement(item.variationId)}
              onRemove={() => handleRemove(item.variationId)}
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
              <span>{t('cart.discount')} (10%)</span>
              <span>-€{discount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>{t('cart.shipping')}</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  `€${shipping.toFixed(2)}`
                )}
              </span>
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
              onClick={() => {
                // TODO: Navigate to checkout
                alert('cart.Proceeding to checkout...');
                // router.push('/checkout');
              }}
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
