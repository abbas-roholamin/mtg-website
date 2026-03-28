import { Minus, Plus, Shield, Truck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import ProductGallery from './ImageGallery';
import { ProductDetail as ProductDetailType, Variation } from '@/types/product';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface ProductDetailProps {
  product: ProductDetailType;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const defaultVariation: Variation = product.variations[0];
  const [selectedVariation, setSelectedVariation] = useState(defaultVariation);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();

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
      productId: product.id,
      variationId: selectedVariation.id,
      sku: selectedVariation.sku,
      name: product.name,
      price: parseFloat(selectedVariation.price),
      quantity: quantity,
      thumbnail: selectedVariation.thumbnail || product.thumbnail,
      color: selectedVariation.attributes[0]?.values[0]?.label || '',
    });

    toast.success(
      `Added ${quantity} × ${product.name} (${selectedVariation.attributes[0]?.values[0]?.label}) to cart!`
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="flex flex-col gap-4">
        <ProductGallery images={selectedVariation.images} />
      </div>
      <div>
        <h1 className="text-foreground mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
          {product.name}
        </h1>

        <div className="flex items-baseline gap-3">
          <span className="text-foreground font-poppins text-4xl font-bold">
            €{parseFloat(selectedVariation.price).toFixed(2)}
          </span>
          {selectedVariation.stock > 0 ? (
            <span className="text-sm font-medium text-green-600">
              In stock ({selectedVariation.stock} left)
            </span>
          ) : (
            <span className="text-sm font-medium text-red-600">
              Out of stock
            </span>
          )}
        </div>

        {/* Product Attributes (like material, etc.) */}
        {Object.keys(product.attributes).length > 0 && (
          <div className="relative mt-4 h-max w-full rounded-lg border bg-[#f7f7f75e] p-4">
            <div className="text-sm leading-6">
              {Object.entries(product.attributes)
                .filter(([, value]) => value)
                .map(([key, value]) => (
                  <div key={key} className="grid grid-cols-5 not-last:border-b">
                    <span className="col-span-2 py-2">
                      <b className="text-foreground font-semibold">{key}</b>
                    </span>
                    <span className="col-span-3 py-2 text-gray-700">
                      {value}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {product.variations.length > 1 && (
          <div className="my-6 space-y-3">
            <label className="text-foreground block text-sm font-medium">
              Bag Color
            </label>
            <div className="flex flex-wrap gap-3">
              {product.variations.map(variant => {
                const colorValue = variant.attributes[0]?.values[0];
                const isSelected = variant.id === selectedVariation.id;

                return (
                  <button
                    key={variant.id}
                    onClick={() => handleVariationChange(variant)}
                    className={`group relative h-11 w-11 rounded-full border-2 transition-all ${
                      isSelected
                        ? 'border-primary scale-110 shadow-md'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: colorValue?.value || '#ddd' }}
                    title={colorValue?.label}
                  >
                    {isSelected && (
                      <div className="border-primary absolute -inset-1 rounded-full border-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <label className="text-foreground block text-sm font-medium">
            Quantity
          </label>
          <div className="border-border flex w-fit items-center gap-2 rounded-lg border bg-white p-1">
            <button
              onClick={decrementQuantity}
              disabled={quantity === 1}
              className="border-border hover:bg-muted rounded-md border p-2 transition-colors disabled:opacity-50"
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="min-w-[48px] text-center text-sm font-semibold">
              {quantity}
            </div>
            <button
              onClick={incrementQuantity}
              disabled={quantity >= selectedVariation.stock}
              className="border-border hover:bg-muted rounded-md border p-2 transition-colors disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {selectedVariation.stock < 5 && selectedVariation.stock > 0 && (
            <p className="text-xs text-amber-600">
              Only {selectedVariation.stock} left in stock!
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 pt-4 sm:flex-row">
          <Button
            onClick={handleBuyNow}
            disabled={selectedVariation.stock === 0}
            className="grow rounded-xl py-6 text-base font-semibold"
          >
            Buy Now
          </Button>

          <Button
            onClick={handleAddToCart}
            disabled={selectedVariation.stock === 0}
            variant="outline"
            className="grow rounded-xl py-6 text-base font-semibold"
          >
            Add to Cart
          </Button>
        </div>

        <div className="border-border mt-6 space-y-3 border-t pt-6">
          <div className="flex items-start gap-3">
            <Truck className="text-accent mt-0.5 h-5 w-5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-foreground text-sm font-medium">
                Free delivery on orders over €50.00
              </p>
              <p className="text-muted-foreground text-xs">
                <a href="#" className="underline">
                  See shipping terms
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="text-accent mt-0.5 h-5 w-5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-foreground text-sm font-medium">
                2 years warranty -{' '}
                <a href="#" className="underline">
                  Read More
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
