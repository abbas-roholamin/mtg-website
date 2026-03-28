'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import CartItem from '@/components/cart/CartItem';
import Wrapper from '@/components/common/Wrapper';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCart();
  const t = useTranslations('cart');

  const [discountRate] = useState(0.1); // 10% discount

  const subtotal = getTotalPrice();
  const discount = subtotal * discountRate;
  const shipping = subtotal > 50 ? 0 : 20;
  const total = subtotal - discount + shipping;

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 5);

  const itemCount = getTotalItems();

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
        {t('empty')}
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-primary flex h-11 items-center text-white">
        <Wrapper>
          <span className="font-poppins font-bold">{t('cart')}</span>{' '}
          <span>
            ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </span>
        </Wrapper>
      </div>

      <Wrapper className="grid grid-cols-1 gap-12 p-6 lg:grid-cols-[1fr_1fr_1.5fr] xl:grid-cols-3 xl:gap-16">
        {/* Cart Items List */}
        <div className="lg:col-span-2 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-b-neutral-200">
          {cart.map(item => (
            <CartItem
              key={item.variationId}
              item={{
                id: item.variationId,
                name: item.name,
                image: item.thumbnail,
                color: item.color,
                design: '',
                price: item.price,
                quantity: item.quantity,
              }}
              onIncrement={() => handleIncrement(item.variationId)}
              onDecrement={() => handleDecrement(item.variationId)}
              onRemove={() => handleRemove(item.variationId)}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="grid h-fit gap-6 rounded-[16px] border border-neutral-200 p-5 sm:gap-8 sm:p-8">
          <h2 className="font-poppins text-2xl font-bold sm:text-[28px]">
            {t('order_summary')}
          </h2>

          <div className="grid gap-4 text-sm sm:gap-6 sm:text-base">
            <div className="flex justify-between">
              <span>{t('price')}</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>{t('discount')} (10%)</span>
              <span>-€{discount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>{t('shipping')}</span>
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
              <span>{t('total')}</span>
              <span>€{total.toFixed(2)}</span>
            </div>

            <div className="text-muted-foreground flex justify-between text-sm">
              <span>{t('estimated_delivery')}</span>
              <span>{estimatedDate.toLocaleDateString()}</span>
            </div>

            <Button
              className="bg-primary w-full cursor-pointer"
              size={'lg'}
              onClick={() => {
                // TODO: Navigate to checkout
                alert('Proceeding to checkout...');
                // router.push('/checkout');
              }}
            >
              {t('checkout')}
            </Button>

            <Button variant="outline" className="w-full" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
