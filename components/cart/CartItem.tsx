import { MinusIcon, PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { CartItem } from '@/types/cart';

interface CartItemProps {
  item: CartItem;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) {
  const t = useTranslations('pages');
  const color = item.variation_attributes.find(a => a.attribute === 'color');
  const size = item.variation_attributes.find(a => a.attribute === 'size');

  if (!color) return size ? `(${size.label})` : '';

  return (
    <div className="flex items-center gap-4 py-6 sm:py-8">
      <div className="relative size-24 overflow-hidden rounded-2xl bg-neutral-50 sm:size-46">
        <Image
          src={item.thumbnail}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h2 className="font-poppins text-lg font-bold sm:text-2xl">
          {item.name}
        </h2>

        <div className="mt-2 flex items-center gap-4 text-sm text-neutral-950 sm:text-base">
          <span className="text-neutral-700">{t('cart.variant')}:</span>
          <div>
            <span className="bg-secondary text-secondary-foreground inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap">
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: color.value }}
                ></span>
                {color.label}
              </span>
              {size ? ` (${size.label})` : ''}
            </span>
          </div>
        </div>

        <p className="font-poppins mt-2 text-xl font-bold sm:hidden">
          ${item.price}
        </p>

        <div className="mt-6 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDecrement(item.variationId)}
              className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-neutral-100 hover:opacity-90 sm:size-10"
            >
              <MinusIcon className="size-4" />
            </button>

            <span className="px-2">{item.quantity}</span>

            <button
              onClick={() => onIncrement(item.variationId)}
              className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-neutral-100 hover:opacity-90 sm:size-10"
            >
              <PlusIcon className="size-4" />
            </button>
          </div>
          <button
            onClick={() => onRemove(item.variationId)}
            className="text-sm text-red-500 hover:underline"
          >
            {t('cart.remove')}
          </button>
        </div>
      </div>

      <p className="font-poppins hidden text-2xl font-bold sm:block">
        ${item.price}
      </p>
    </div>
  );
}
