'use client';
import { useQuery } from '@tanstack/react-query';
import { Masonry as MasonryGrid } from 'react-plock';
import MasonrySKeleton from './skeleton/MasonrySKeleton';
import { fetchGallery } from '@/queries/gallery';
import { GALLERY_QUERY_KEY } from '@/constants/query-keys';

const STALE_TIME = 1000 * 60 * 60; // 1 HOUR
const GC_TIEM = 1000 * 60 * 60 * 2; // 2 HOUR

export default function Masonry() {
  const { data, isPending } = useQuery({
    queryKey: [GALLERY_QUERY_KEY],
    queryFn: () => fetchGallery(),
    staleTime: STALE_TIME,
    gcTime: GC_TIEM,
  });

  if (isPending) {
    return <MasonrySKeleton />;
  }

  const images = data?.data ?? [];

  return (
    <MasonryGrid
      items={images}
      config={{
        columns: [1, 2, 3],
        gap: [24, 12, 24],
        media: [640, 768, 1024],
      }}
      render={image => (
        <img
          key={image.id}
          src={image.image}
          alt="gallery"
          style={{ width: '100%', height: 'auto' }}
          className="overflow-hidden rounded-2xl"
        />
      )}
    />
  );
}
