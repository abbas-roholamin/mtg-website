import { BadgeCheck, BriefcaseBusiness, Users } from 'lucide-react';
import React from 'react';

export default function Highlights() {
  return (
    <ul className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10 xl:gap-12">
      <li>
        <BriefcaseBusiness className="mb-2.5 size-8 lg:size-10 xl:size-12" />
        <h3 className="mb-2 text-lg font-bold lg:text-xl xl:text-2xl">
          Travel-Ready Design
        </h3>
        <p className="text-neutral-700">
          Our games are compact, lightweight, and easy to pack — perfect for
          road trips, flights, and weekend escapes.
        </p>
      </li>
      <li>
        <BadgeCheck className="mb-2.5 size-8 lg:size-10 xl:size-12" />
        <h3 className="mb-2 text-lg font-bold lg:text-xl xl:text-2xl">
          Timeless Craftsmanship
        </h3>
        <p className="text-neutral-700">
          We focus on durable materials and classic aesthetics that feel just as
          good at home as they do abroad.
        </p>
      </li>
      <li>
        <Users className="mb-2.5 size-8 lg:size-10 xl:size-12" />
        <h3 className="mb-2 text-lg font-bold lg:text-xl xl:text-2xl">
          Made for Connection
        </h3>
        <p className="text-neutral-700">
          From quiet chess matches to lively domino nights, our games bring
          people together wherever you are.
        </p>
      </li>
    </ul>
  );
}
