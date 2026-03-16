import React from 'react';
import { Skeleton } from '../ui/skeleton';

export default function ClientSkeleton() {
  return (
    <section className="my-12 sm:my-16 lg:my-20">
      <div className="wrapper">
        <ul className="flex items-center gap-22.5 overflow-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <li key={index}>
              <Skeleton className="h-14 w-52 rounded-full bg-neutral-100" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
