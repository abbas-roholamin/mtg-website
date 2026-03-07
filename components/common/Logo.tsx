'use client';
import Image, { ImageProps } from 'next/image';
import { useSetting } from '@/providers/SettingProvider';
import { cn } from '@/lib/utils';

type LogoProps = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'>;

export default function Logo({ className, ...rest }: LogoProps) {
  const setting = useSetting();

  return (
    <Image
      src={setting.logo}
      alt={setting.name}
      width={100}
      height={100}
      className={cn('size-20 object-contain', className)}
      {...rest}
    />
  );
}
