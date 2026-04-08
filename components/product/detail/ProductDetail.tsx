import { Minus, Plus, Shield, Truck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ProductGallery from './ImageGallery';
import { ProductDetail as ProductDetailType, Variation } from '@/types/product';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useCheckoutMutation } from '@/hooks/use-checkout-mutation';

interface ProductDetailProps {
  product: ProductDetailType;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const defaultVariation: Variation = product.variations[0];
  const [selectedVariation, setSelectedVariation] = useState(defaultVariation);
  const [quantity, setQuantity] = useState<number>(1);
  const t = useTranslations('pages');
  const c = useTranslations('checkout');
  const { addToCart } = useCart();
  const { mutate, isPending } = useCheckoutMutation();

  const handleVariationChange = (variation: Variation) => {
    setSelectedVariation(variation);
    setQuantity(1);
  };

  const incrementQuantity = () => {
    if (quantity < selectedVariation.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      product_id: product.id,
      product_variation_id: selectedVariation.id,
      name: product.name,
      price: selectedVariation.price,
      formatted_price: selectedVariation.formatted_price,
      final_price: selectedVariation.final_amount,
      final_formatted_price: selectedVariation.final_formatted_amount,
      quantity: quantity,
      stock: selectedVariation.stock,
      thumbnail: selectedVariation.thumbnail || product.thumbnail,
      attributes: product.attributes,
      variation_attributes: selectedVariation.attributes,
    });

    toast.success(
      t('product.details.product.cta.added', {
        quantity: quantity,
        product: product.name,
      })
    );
  };

  const handleBuyNow = async () => {
    const unit_amount = selectedVariation.final_amount
      ? selectedVariation.final_amount
      : selectedVariation.price;

    const subtotal_amount = selectedVariation.price * quantity;
    const discount_amount = selectedVariation.final_amount
      ? selectedVariation.price * quantity -
        selectedVariation.final_amount * quantity
      : 0;

    mutate(
      {
        items: [
          {
            price_data: {
              product_data: {
                name: product.name,
                images: [selectedVariation.thumbnail],
              },
              currency: 'eur',
              unit_amount,
            },
            metadata: {
              product_id: product.id,
              product_variation_id: selectedVariation.id,
            },
            quantity,
          },
        ],
        subtotal_amount,
        discount_amount,
        total_amount: subtotal_amount - discount_amount,
        customization_price: 0,
        notes: '',
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

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
      <h1 className="text-foreground col-span-full block text-3xl font-bold sm:text-4xl lg:hidden lg:text-5xl">
        {product.name}
      </h1>
      <div className="flex flex-col gap-4">
        <ProductGallery images={selectedVariation.images} />
      </div>
      <div>
        <h1 className="text-foreground mb-6 hidden text-3xl font-bold sm:text-4xl lg:block lg:text-5xl">
          {product.name}
        </h1>

        <div className="mb-6 flex items-end gap-4">
          <div>
            <p
              className={cn('text-foreground font-poppins text-4xl font-bold', {
                'text-2xl text-neutral-500 line-through': product.coupon,
              })}
            >
              {selectedVariation.formatted_price}
            </p>
            {product.coupon && (
              <p className="text-foreground font-poppins text-4xl font-bold">
                {selectedVariation.final_formatted_amount}
              </p>
            )}
          </div>

          {selectedVariation.stock > 0 ? (
            <span className="text-sm font-medium text-green-600">
              {t('product.details.product.stock.in', {
                count: selectedVariation.stock,
              })}
            </span>
          ) : (
            <span className="text-sm font-medium text-red-600">
              {t('product.details.product.stock.out')}
            </span>
          )}
        </div>

        <div className="mb-10">
          {/* Variations */}
          <div className="space-y-3">
            <label className="text-foreground mb-3 block text-sm font-bold">
              {t('product.details.product.variations')}
            </label>
            <ul className="flex flex-wrap gap-3">
              {product.variations.map(variant => {
                const color = variant.attributes.find(
                  a => a.attribute === 'color'
                );
                const size = variant.attributes.find(
                  a => a.attribute === 'size'
                );
                if (!color) return size ? `(${size.label})` : '';

                return (
                  <li key={variant.id}>
                    <button onClick={() => handleVariationChange(variant)}>
                      <span
                        className="bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded border border-transparent px-2 py-2 text-sm font-medium whitespace-nowrap hover:cursor-pointer"
                        style={{
                          borderColor:
                            selectedVariation.id === variant.id
                              ? color.value
                              : '',
                        }}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="h-3 w-3 shrink-0 rounded-full"
                            style={{ backgroundColor: color.value }}
                          ></span>
                          {color.label}
                        </span>
                        {size ? ` (${size.label})` : ''}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Attributes */}
          {Object.keys(product.attributes).length > 0 && (
            <div className="relative mt-6 h-max w-full">
              <label className="text-foreground mb-3 block text-sm font-bold">
                {t('product.details.product.attributes')}
              </label>
              <ul className="text-sm leading-6">
                {Object.entries(product.attributes)
                  .filter(([, value]) => value)
                  .map(([key, value]) => (
                    <li key={key}>
                      <Badge variant="secondary">{value}</Badge>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mb-4 space-y-3">
          <label className="text-foreground mb-3 block text-sm font-bold">
            {t('product.details.product.quantity')}
          </label>
          <div className="flex w-fit items-center gap-2">
            <button
              onClick={decrementQuantity}
              disabled={quantity === 1}
              className="border-border hover:bg-muted rounded-md border p-2 transition-colors hover:cursor-pointer disabled:opacity-50"
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="min-w-[48px] text-center text-sm font-semibold">
              {quantity}
            </div>
            <button
              onClick={incrementQuantity}
              disabled={quantity >= selectedVariation.stock}
              className="border-border hover:bg-muted rounded-md border p-2 transition-colors hover:cursor-pointer disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            onClick={handleBuyNow}
            disabled={selectedVariation.stock === 0 || isPending}
            className="grow rounded-lg py-6 text-base font-semibold hover:cursor-pointer"
          >
            {t('product.details.product.cta.buy_now')}
          </Button>

          <Button
            onClick={handleAddToCart}
            disabled={selectedVariation.stock === 0 || isPending}
            variant="outline"
            className="grow rounded-lg py-6 text-base font-semibold hover:cursor-pointer"
          >
            {t('product.details.product.cta.add_to_cart')}
          </Button>
        </div>

        <div className="border-border mt-8 space-y-3 border-t pt-6">
          <div className="flex items-start gap-3">
            <Truck className="text-accent mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-foreground text-sm font-medium">
              {t('product.details.product.links.shipping')}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="text-accent mt-0.5 h-5 w-5 shrink-0" />
            <div className="flex-1">
              <p className="text-foreground text-sm font-medium">
                {t.rich('product.details.product.links.warranty', {
                  tag: value => (
                    <Link
                      href="#warranty"
                      className="text-muted-foreground text-xs underline"
                    >
                      {value}
                    </Link>
                  ),
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
