import React from 'react';
import { cn } from '@/lib/utils';

export default function SectionContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'container mx-auto my-12 px-5 sm:my-16 sm:px-8 lg:my-20 lg:px-12',
        className
      )}
    >
      {children}
    </section>
  );
}
