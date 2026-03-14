'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import SectionContainer from '../common/SectionContainer';
import { CLIENTS_QUERY_KEY } from '@/constants/query-keys';
import { fetchClients } from '@/queries/clients';
import { Locale } from '@/types/locale';

export default function Clients() {
  const locale = useLocale();
  const { data } = useQuery({
    queryKey: [CLIENTS_QUERY_KEY, locale],
    queryFn: () => fetchClients(locale as Locale),
  });

  return (
    <SectionContainer className="overflow-hidden">
      <div className="relative md:[mask-image:linear-gradient(to_right,#000_60%,transparent_100%)]">
        <div className="relative md:[mask-image:linear-gradient(to_left,#000_80%,transparent_100%)]">
          <div className="infinite-slides relative flex w-max">
            {data?.data?.map(client => (
              <div key={client.name} className="inline-block">
                <div className="relative mx-8 h-[60px] w-[80px] overflow-hidden rounded-2xl">
                  <Image
                    className="h-full w-full object-contain"
                    fill
                    src={client.image}
                    alt="test"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
