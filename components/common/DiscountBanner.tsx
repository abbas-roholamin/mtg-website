'use client';

import { useSetting } from '@/providers/SettingProvider';

export default function DiscountBanner() {
  const setting = useSetting();

  return (
    <section className="bg-primary py-2 text-white">
      <div className="wrapper">
        <div className="flex items-center justify-between gap-4">
          {setting.email}
        </div>
      </div>
    </section>
  );
}
