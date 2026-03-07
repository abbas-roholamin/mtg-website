'use client';
import { useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { MapPinIcon, PhoneIcon } from 'lucide-react';
import GoogleMap from '../common/GoogleMap';
import BranchSkeleton from '../skeleton/BranchSkeleton';
import { BRANCHES_QUERY_KEY } from '@/constants/query-keys';
import { fetchBranches } from '@/queries/branch';

export default function Branch() {
  const t = useTranslations('sections');
  const locale = useLocale();
  const { data, isPending } = useQuery({
    queryKey: [BRANCHES_QUERY_KEY, locale],
    queryFn: fetchBranches,
  });

  const branches = data?.data ?? [];

  if (isPending) return <BranchSkeleton />;

  return (
    <section className="space-y-12 sm:space-y-20 md:space-y-28 lg:space-y-40">
      {branches.map(branch => (
        <article
          key={branch.address}
          className="group grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 lg:gap-10"
        >
          <div className="col-span-2 overflow-hidden rounded-md bg-neutral-50 lg:group-even:col-start-2">
            <GoogleMap code={branch.map_embed_code} />
          </div>
          <div className="lg:group-even:col-start-1 lg:group-even:row-start-1">
            <div className="mb-5 md:mb-6 lg:mb-8">
              <h3 className="text-primary font-quick-sand mb-1.5 text-4xl font-bold sm:mb-2 md:mb-3 md:text-5xl lg:mb-4 lg:text-6xl">
                {branch.country}
              </h3>
              <p className="text-neutral-500 md:text-base lg:text-lg">
                {t('branch.location', { country: branch.country })}
              </p>
            </div>
            <div className="space-y-7">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <MapPinIcon className="size-5" />
                  <p className="font-semibold md:font-bold">
                    {t('branch.address')}
                  </p>
                </div>
                <address className="font-normal text-neutral-700">
                  {branch.address}
                </address>
              </div>
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <PhoneIcon className="size-5" />
                  <p className="font-semibold md:font-bold">
                    {t('branch.phone')}
                  </p>
                </div>
                <ul>
                  {branch.phones.map(phone => (
                    <li key={phone} className="font-normal text-neutral-700">
                      <a
                        href={`tel:${phone}`}
                        rel="noreferrer"
                        target="_blank"
                        className="hover:underline"
                      >
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
