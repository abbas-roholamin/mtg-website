import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Section from '@/components/common/Section';
import Wrapper from '@/components/common/Wrapper';
import { Button } from '@/components/ui/button';

export default async function page() {
  const t = await getTranslations('order_status');

  return (
    <Section>
      <Wrapper>
        <div className="my-36 flex flex-col items-center justify-center text-center sm:my-32 lg:my-48">
          <div className="relative size-28 sm:size-32 lg:size-40">
            <Image
              src="/icons/payment-success.svg"
              alt="Payment Success"
              fill
              className="h-full w-full object-cover"
            />
          </div>

          <h3 className="text-lg font-semibold sm:text-2xl">{t('done')}</h3>
          <p className="mt-2 max-w-[280px] text-sm sm:max-w-max sm:text-base">
            {t('done_description')}
          </p>

          <Button className="mt-8">{t('done_btn')}</Button>
        </div>
      </Wrapper>
    </Section>
  );
}
