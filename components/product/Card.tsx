import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  return (
    <article>
      <div className="relative mb-3 aspect-square overflow-hidden rounded-2xl bg-neutral-100">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <Link href={`/shop/${product.slug}`}>
        <h2 className="mb-1 text-center text-base text-neutral-950 md:text-lg">
          {product.name}
        </h2>
      </Link>
      <div className="flex items-center justify-center gap-1">
        {product.coupon && (
          <p className="font-poppins text-center text-xl font-bold text-neutral-950 md:text-2xl lg:text-3xl">
            {product.coupon.final_formatted_amount}
          </p>
        )}
        <p
          className={cn(
            'font-poppins text-center text-xl font-bold text-neutral-950 md:text-2xl lg:text-3xl',
            {
              'text-md font-bold text-neutral-500 line-through md:text-lg lg:text-xl':
                product.coupon,
            }
          )}
        >
          {product.formatted_price}
        </p>
      </div>
    </article>
  );
}
