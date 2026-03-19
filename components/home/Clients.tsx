'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { CSSProperties } from 'react';
import ClientSkeleton from '../skeleton/ClientSkeleton';
import Section from '../common/Section';
import Wrapper from '../common/Wrapper';
import { CLIENTS_QUERY_KEY } from '@/constants/query-keys';
import { fetchClients } from '@/queries/clients';

const STALE_TIME = 1000 * 60 * 60; // 1 HOUR
const GC_TIEM = 1000 * 60 * 60 * 2; // 2 HOUR

export default function Clients() {
  const { data, isPending } = useQuery({
    queryKey: [CLIENTS_QUERY_KEY],
    queryFn: () => fetchClients(),
    staleTime: STALE_TIME,
    gcTime: GC_TIEM,
  });

  const clients = data?.data ?? [];

  if (isPending) {
    return <ClientSkeleton />;
  }

  return (
    <Section>
      <Wrapper>
        <div
          className="marquee fadeout-horizontal"
          style={{ '--num-items': clients.length } as CSSProperties}
        >
          <div className="marquee-track">
            {clients?.map((client, index) => (
              <a
                href={client.url}
                key={client.name}
                className="marquee-item relative h-14"
                style={{ '--item-position': index + 1 } as CSSProperties}
              >
                <Image
                  className="h-full w-full object-contain opacity-60 grayscale hover:opacity-100"
                  fill
                  src={client.image}
                  alt={client.name}
                />
              </a>
            ))}
          </div>
        </div>
      </Wrapper>
    </Section>
  );
}
