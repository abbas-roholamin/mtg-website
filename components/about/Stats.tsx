import React from 'react';

export default function Stats() {
  return (
    <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8 xl:gap-12">
      <li className="flex flex-col items-center">
        <p className="text-primary font-quick-sand mb-2.5 text-2xl text-5xl font-bold lg:text-6xl xl:text-7xl">
          1500+
        </p>
        <p className="text-base text-neutral-700 md:text-lg">Games Delivered</p>
      </li>
      <li className="flex flex-col items-center">
        <p className="text-primary font-quick-sand mb-2.5 text-2xl text-5xl font-bold lg:text-6xl xl:text-7xl">
          98%
        </p>
        <p className="text-base text-neutral-700 md:text-lg">
          Customer Satisfaction
        </p>
      </li>
      <li className="flex flex-col items-center">
        <p className="text-primary font-quick-sand mb-2.5 text-2xl text-5xl font-bold lg:text-6xl xl:text-7xl">
          6
        </p>
        <p className="text-base text-neutral-700 md:text-lg">
          Countries Shipped To
        </p>
      </li>
      <li className="flex flex-col items-center">
        <p className="text-primary font-quick-sand mb-2.5 text-2xl text-5xl font-bold lg:text-6xl xl:text-7xl">
          24/7
        </p>
        <p className="text-base text-neutral-700 md:text-lg">
          Secure Online Ordering
        </p>
      </li>
    </ul>
  );
}
