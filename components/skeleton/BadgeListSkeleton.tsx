import React from 'react';
import { Skeleton } from '../ui/skeleton';

export default function BadgeListSkeleton() {
  return (
    <ul className="flex items-center gap-2">
      <li>
        <Skeleton className="h-9 w-20 rounded-xl" />
      </li>
      <li>
        <Skeleton className="h-9 w-20 rounded-xl" />
      </li>
    </ul>
  );
}
