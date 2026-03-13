import { getTranslations } from 'next-intl/server';
import Masonry from '@/components/gallery/Masonry';

export default async function Page() {
  const t = await getTranslations('pages');

  return (
    <section className="py-20">
      <div className="wrapper">
        <h1 className="text-primary font-quick-sand mb-12 text-center text-7xl font-bold">
          {t('gallery.title')}
        </h1>
        <Masonry />
      </div>
    </section>
  );
}
