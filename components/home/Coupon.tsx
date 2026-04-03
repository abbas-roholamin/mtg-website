'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Button } from '../ui/button';
import Countdown from '../common/Countdown';
import Section from '../common/Section';
import Wrapper from '../common/Wrapper';
import CouponSkeleon from '../skeleton/CouponSkeleon';
import { COUPON_QUERY_KEY } from '@/constants/query-keys';
import { fetchCoupon } from '@/queries/coupon';

export default function Coupon() {
  const t = useTranslations('pages.home');
  const { data, isPending } = useQuery({
    queryKey: [COUPON_QUERY_KEY],
    queryFn: () => fetchCoupon(),
  });

  if (isPending) return <CouponSkeleon />;

  const coupon = data?.data;

  if (!coupon) return;

  return (
    <Section>
      <Wrapper>
        <div className="flex flex-col-reverse rounded-4xl bg-[#f7f7f7] py-12 md:grid md:grid-cols-2">
          <div className="flex flex-col items-start justify-center gap-2 px-5 sm:px-8 md:gap-4 md:px-12 xl:px-16">
            <h1 className="font-poppins text-3xl font-bold lg:text-4xl">
              {coupon.name}
            </h1>
            <div
              className="text-base"
              dangerouslySetInnerHTML={{ __html: coupon.description }}
            ></div>
            <div className="font-poppins flex items-end justify-center gap-3">
              <p className="text-lg text-neutral-400 line-through md:text-xl">
                {coupon.product.formatted_price}
              </p>
              <p className="text-2xl font-bold md:text-3xl">
                {coupon.final_price.formatted_amount}
              </p>
            </div>
            <Countdown targetDate={coupon.expiration_date} />

            <Button size={'lg'}>
              <Link href={`/shop/${coupon.product.slug}`}>{t('shop_now')}</Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="relative aspect-square size-full max-w-100">
              <Image
                src={coupon.product.thumbnail}
                alt={coupon.product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </Section>
  );
}
