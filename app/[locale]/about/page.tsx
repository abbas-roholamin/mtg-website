import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import Highlights from '@/components/about/Highlights';
import Stats from '@/components/about/Stats';
import Contact from '@/components/sections/Contact';
import Faq from '@/components/sections/Faq';
import Section from '@/components/common/Section';
import Wrapper from '@/components/common/Wrapper';

export default async function Page() {
  const t = await getTranslations('pages');

  return (
    <Section>
      <Wrapper>
        <div className="space-y-24 md:space-y-32 lg:space-y-40">
          <section className="space-y-8 md:space-y-12 lg:space-y-16 xl:space-y-20">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-6 lg:gap-8 xl:gap-10">
              <h1 className="text-primary font-poppins text-3xl font-bold text-balance md:w-3/6 lg:text-4xl xl:text-5xl">
                {t('about.title')}
              </h1>
              {/* <p className="text-balance text-neutral-500 md:w-2/6">
                {t('about.description')}
              </p> */}
            </div>
            <div
              className="text-balance text-neutral-900"
              dangerouslySetInnerHTML={{ __html: t('about.description') }}
            />
            <Highlights />
            <Image
              src="/images/a1d6eb709a9a6269d442e52b00c8229e9f049edc.jpg"
              alt="Toy"
              width={2000}
              height={750}
              className="block rounded-xl object-cover"
              quality={100}
            />
            <Stats />
          </section>
          <Contact />
          <Faq />
        </div>
      </Wrapper>
    </Section>
  );
}
