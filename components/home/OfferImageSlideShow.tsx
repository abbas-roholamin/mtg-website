'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type OfferImageSlideShowProps = {
  images: string[];
};

export default function OfferImageSlideShow({
  images,
}: OfferImageSlideShowProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg shadow-[0_0_0.5rem_rgba(0,0,0,0.5)]">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          alt={image.alt}
          className={`absolute top-0 left-0 h-full w-full object-cover transition-all duration-500 ease-in-out ${
            index === currentImageIndex
              ? 'z-10 translate-x-0 scale-100 rotate-0 opacity-100'
              : '-translate-x-4 scale-110 -rotate-6 opacity-0'
          } `}
        />
      ))}
    </div>
  );
}
