import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';

export default function WaysToShopCard({
  icon,
  title,
  description,
  feature1,
  feature2,
  feature3,
  button,
  href,
}: {
  icon: string;
  title: string;
  description: string;
  feature1: string;
  feature2: string;
  feature3: string;
  button: string;
  href: string;
}) {
  return (
    <div className="bg-secondary grid gap-32 rounded-3xl p-8 sm:gap-40 lg:p-12 xl:gap-64 xl:rounded-4xl">
      <div>
        <div className="relative size-10 sm:size-12 lg:size-16 xl:size-20">
          <Image src={icon} alt="logo" fill className="object-cover" />
        </div>
        <h1 className="font-poppins mt-2 text-3xl font-bold sm:mt-4 sm:text-4xl lg:text-5xl xl:text-6xl">
          {title}
        </h1>
        <p className="mt-2 text-base lg:text-lg">{description}</p>
      </div>
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="relative size-6 lg:size-7">
            <Image src="/icons/tick.svg" alt="tick mark" fill />
          </div>
          <p className="text-base">{feature1}</p>
        </div>
        <div className="mb-2 flex items-center gap-2">
          <div className="relative size-6 lg:size-7">
            <Image src="/icons/tick.svg" alt="tick mark" fill />
          </div>
          <p>{feature2}</p>
        </div>
        <div className="mb-2 flex items-center gap-2">
          <div className="relative size-6 lg:size-7">
            <Image src="/icons/tick.svg" alt="tick mark" fill />
          </div>
          <p>{feature3}</p>
        </div>
        <Link href={href}>
          <Button className="mt-4 lg:mt-8" size={'lg'}>
            {button}
          </Button>
        </Link>
      </div>
    </div>
  );
}
