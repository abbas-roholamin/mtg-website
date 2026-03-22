import { MinusIcon, PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type CartItemProps = {
  item: {
    id: number;
    name: string;
    image: string;
    color: string;
    design: string;
    price: number;
    quantity: number;
  };
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
};

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) {
  const t = useTranslations('cart');

  return (
    <div className="flex items-center gap-4 py-6 sm:py-8">
      <div className="relative size-24 overflow-hidden rounded-[12px] bg-neutral-50 sm:size-46">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <h2 className="font-quick-sand text-lg font-bold sm:text-2xl">
          {item.name}
        </h2>

        <div className="mt-2 text-sm text-neutral-950 sm:text-base">
          <p>
            <span className="text-neutral-400">{t('color')}:</span> {item.color}
          </p>
          <p>
            <span className="text-neutral-400">{t('design')}:</span>{' '}
            {item.design}
          </p>
        </div>

        <p className="font-quick-sand mt-2 text-xl font-bold sm:hidden">
          ${item.price}
        </p>

        <div className="mt-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDecrement(item.id)}
              className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-neutral-100 hover:opacity-90 sm:size-10"
            >
              <MinusIcon className="size-4" />
            </button>

            <span className="px-2">{item.quantity}</span>

            <button
              onClick={() => onIncrement(item.id)}
              className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-neutral-100 hover:opacity-90 sm:size-10"
            >
              <PlusIcon className="size-4" />
            </button>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-sm text-red-500 hover:underline"
          >
            {t('remove')}
          </button>
        </div>
      </div>

      <p className="font-quick-sand hidden text-2xl font-bold sm:block">
        ${item.price}
      </p>
    </div>
  );
}
