'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import CartItem from '@/components/cart/CartItem';
import Wrapper from '@/components/common/Wrapper';
import { Button } from '@/components/ui/button';

type CartItem = {
  id: number;
  name: string;
  image: string;
  color: string;
  design: string;
  price: number;
  quantity: number;
};

const initialCart: CartItem[] = [
  {
    id: 1,
    name: 'Backgammon',
    image: '/images/g1.png',
    color: 'Red',
    design: 'Minimal',
    price: 120,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Chess',
    image: '/images/g1.png',
    color: 'Brown',
    design: 'Classic',
    price: 250,
    quantity: 2,
  },
];

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const t = useTranslations('cart');

  const increment = (id: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discount = subtotal * 0.1;
  const shipping = subtotal > 0 ? 20 : 0;
  const total = subtotal - discount + shipping;

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 5);

  if (cart.length === 0) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-2xl font-semibold">
        {t('empty')}
      </div>
    );
  }

  return (
    <div>
      <div className="bg-primary flex h-11 items-center text-white">
        <Wrapper>
          <span className="font-quick-sand font-bold">{t('cart')}</span>{' '}
          <span>(2 items)</span>
        </Wrapper>
      </div>
      <Wrapper className="grid grid-cols-1 gap-12 p-6 lg:grid-cols-[1fr_1fr_1.5fr] xl:grid-cols-3 xl:gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-b-neutral-200">
          {cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onIncrement={increment}
              onDecrement={decrement}
              onRemove={removeItem}
            />
          ))}
        </div>

        {/* Summary */}
        <div className="grid h-fit gap-6 rounded-[16px] border border-neutral-200 p-5 sm:gap-8 sm:p-8">
          <h2 className="font-quick-sand text-2xl font-bold sm:text-[28px]">
            {t('order_summary')}
          </h2>

          <div className="grid gap-4 text-sm sm:gap-6 sm:text-base">
            <div className="flex justify-between">
              <span>{t('price')}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>{t('discount')} (10%)</span>
              <span>-${discount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>{t('shipping')}</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="h-px w-full bg-neutral-200" />

            <div className="flex justify-between text-lg font-semibold">
              <span>{t('total')}</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>{t('estimated_delivery')}</span>
              <span>{estimatedDate.toDateString()}</span>
            </div>

            <Button className="bg-primary w-full cursor-pointer" size={'lg'}>
              {t('checkout')}
            </Button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
