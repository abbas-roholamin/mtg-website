import React from 'react';
import { cn } from '@/lib/utils';

export default function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('my-12 sm:my-16 lg:my-20', className)}>
      {children}
    </section>
  );
}
