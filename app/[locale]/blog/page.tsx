import { getTranslations } from 'next-intl/server';
import BlogList from '@/components/blog/BlogList';

export default async function Page() {
  const t = await getTranslations('pages');

  return (
    <section className="py-20">
      <div className="wrapper">
        <h1 className="text-primary font-quick-sand mb-12 text-center text-7xl font-bold">
          {t('blog.title')}
        </h1>
        <BlogList />
      </div>
    </section>
  );
}
