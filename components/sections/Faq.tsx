'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQS_QUERY_KEY } from '@/constants/query-keys';
import { fetchFaqs } from '@/queries/faq';
import { Locale } from '@/types/locale';

const STALE_TIME = 1000 * 60 * 60 * 6; // 6 HOUR
const GC_TIEM = 1000 * 60 * 60 * 24; // 24 HOUR

export default function Faq() {
  const t = useTranslations('sections');
  const locale = useLocale();
  const { data } = useQuery({
    queryKey: [FAQS_QUERY_KEY, locale],
    queryFn: () => fetchFaqs(locale as Locale),
    staleTime: STALE_TIME,
    gcTime: GC_TIEM,
  });

  const faqs = data?.data ?? [];

  return (
    <section>
      <div className="mb-8 text-center md:mb-11 lg:mb-14">
        <h2 className="text-primary font-quick-sand mb-4 text-5xl font-bold md:text-6xl lg:text-7xl">
          {t('faq.title')}
        </h2>
        <p className="text-base font-bold text-neutral-500 md:text-lg lg:text-xl">
          {t('faq.description')}
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="mx-auto space-y-4 lg:max-w-10/12 xl:max-w-3/5"
      >
        {faqs.map(faq => (
          <AccordionItem
            key={faq.question}
            value={faq.answer}
            className="rounded-md bg-neutral-50 px-4 md:px-6"
          >
            <AccordionTrigger className="text-base font-semibold hover:cursor-pointer md:font-bold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-neutral-600">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
