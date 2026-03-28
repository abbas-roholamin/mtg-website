'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number>(0);

  return (
    <div className="space-y-4">
      <div className="border-border relative flex h-100 items-center justify-center overflow-hidden rounded-lg bg-[#F7F7F7] md:h-140 lg:h-150">
        <Image
          src={images[selectedImage]}
          alt="Product image"
          fill
          className="object-contain p-4"
          priority
        />
      </div>

      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="ml-0">
          {images.map((image, index) => (
            <CarouselItem
              key={image}
              className={cn(
                'relative h-16 basis-1/3 overflow-hidden rounded-lg border bg-[#F7F7F7] sm:h-24 md:basis-1/4 lg:basis-1/5',
                {
                  'border-primary': selectedImage === index,
                }
              )}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={40}
                height={40}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
