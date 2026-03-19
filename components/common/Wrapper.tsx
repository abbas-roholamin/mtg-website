import React from 'react';
import { cn } from '@/lib/utils';

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function Wrapper({ children, className }: WrapperProps) {
  return (
    <div className={cn('container mx-auto px-4 md:px-10 xl:px-6', className)}>
      {children}
    </div>
  );
}
