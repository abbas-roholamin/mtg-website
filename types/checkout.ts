export interface Checkout {
  items: Item[];
  subtotal_amount: number;
  discount_amount: number;
  total_amount: number;
  images?: File[];
  notes?: string;
}

export interface Item {
  price_data: {
    product_data: {
      name: string;
      images: string[];
    };
    currency: 'eur';
    unit_amount: number;
  };
  metadata: {
    product_id: number;
    product_variation_id: number;
    customization_id?: number;
    design?: string;
  };
  quantity: number;
}
