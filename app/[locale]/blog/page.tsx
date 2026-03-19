import { getTranslations } from 'next-intl/server';
import BlogList from '@/components/blog/BlogList';
import Section from '@/components/common/Section';
import Wrapper from '@/components/common/Wrapper';

export default async function Page() {
  const t = await getTranslations('pages');

  return (
    <Section>
      <Wrapper>
        <h1 className="text-primary font-quick-sand mb-12 text-center text-7xl font-bold">
          {t('blog.title')}
        </h1>
        <BlogList />
      </Wrapper>
    </Section>
  );
}
