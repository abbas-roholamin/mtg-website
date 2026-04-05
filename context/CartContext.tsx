'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from '@/types/cart';
import { StripeLineItem } from '@/schemas/checkout-schema';

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (variationId: number) => void;
  updateQuantity: (variationId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalFinalPrice: () => number;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getStripeLineItems: () => StripeLineItem[];
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (
    item: Omit<CartItem, 'quantity'> & { quantity?: number }
  ) => {
    setCart(prev => {
      const existing = prev.find(
        i => i.product_variation_id === item.product_variation_id
      );

      if (existing) {
        return prev.map(i =>
          i.product_variation_id === item.product_variation_id
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      } else {
        return [...prev, { ...item, quantity: item.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (variationId: number) => {
    setCart(prev =>
      prev.filter(item => item.product_variation_id !== variationId)
    );
  };

  const updateQuantity = (variationId: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev =>
      prev.map(item =>
        item.product_variation_id === variationId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getTotalFinalPrice = () =>
    cart.reduce((sum, item) => {
      const itemPrice = item.final_price ?? item.price;
      return sum + itemPrice * item.quantity;
    }, 0);

  const getTotalItems = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

  const getStripeLineItems = (): StripeLineItem[] => {
    return cart.map(item => ({
      price_data: {
        product_data: {
          name: item.name,
          images: item.thumbnail ? [item.thumbnail] : [],
        },
        currency: 'eur',
        unit_amount: (item.final_price ? item.final_price : item.price) * 100,
      },
      metadata: {
        product_id: item.product_id,
        product_variation_id: item.product_variation_id,
      },
      quantity: item.quantity,
    }));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalFinalPrice,
        getTotalPrice,
        getTotalItems,
        getStripeLineItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
