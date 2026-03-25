import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function NotFoundPage() {
  const t = await getTranslations('404');

  return (
    <section className="grid place-content-center py-52">
      <div className="wrapper">
        <div className="mb-20 text-center">
          <h1 className="text-primary font-poppins mb-5 text-7xl font-bold">
            {t('title')}
          </h1>
          <p className="text-lg text-neutral-900">{t('description')}</p>
        </div>
        <div className="grid place-content-center">
          <Button asChild variant="secondary" className="font-medium">
            <Link href="/">{t('cta')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
