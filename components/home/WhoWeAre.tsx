import { useTranslations } from 'next-intl';
import ServicesCard from '../common/ServicesCard';
import { Button } from '../ui/button';

function WhoWeAre() {
  const t = useTranslations('whoWeAre');
  return (
    <section className="mx-auto my-20 grid max-w-350 grid-cols-2 content-center gap-20">
      <div className="grid content-center gap-16">
        <div className="grid gap-4">
          <h1 className="text-primary font-quick-sand text-[80px] font-bold">
            {t('title')}
          </h1>
          <p className="text-lg text-neutral-500">{t('description')}</p>
        </div>
        <Button className="w-max" size={'lg'}>
          {t('button')}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mt-8 grid gap-4">
          <ServicesCard
            image="/icons/persons.svg"
            title={t('services.title1')}
            description={t('services.desc1')}
          />
          <ServicesCard
            image="/icons/star.svg"
            title={t('services.title2')}
            description={t('services.desc2')}
          />
        </div>
        <div className="grid gap-4">
          <ServicesCard
            image="/icons/map.svg"
            title={t('services.title3')}
            description={t('services.desc3')}
          />
          <ServicesCard
            image="/icons/heart.svg"
            title={t('services.title4')}
            description={t('services.desc4')}
          />
        </div>
      </div>
    </section>
  );
}

export default WhoWeAre;
