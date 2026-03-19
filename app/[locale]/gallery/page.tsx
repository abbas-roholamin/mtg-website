import { getTranslations } from 'next-intl/server';
import Masonry from '@/components/gallery/Masonry';
import Section from '@/components/common/Section';
import Wrapper from '@/components/common/Wrapper';

export default async function Page() {
  const t = await getTranslations('pages');

  return (
    <Section>
      <Wrapper>
        <h1 className="text-primary font-quick-sand mb-12 text-center text-7xl font-bold">
          {t('gallery.title')}
        </h1>
        <Masonry />
      </Wrapper>
    </Section>
  );
}
