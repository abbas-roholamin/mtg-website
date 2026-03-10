import Image from 'next/image';
import SectionContainer from '../common/SectionContainer';

export default function Clients() {
  const data = [
    {
      id: 1,
      logo: '/visa.svg',
    },
    {
      id: 2,
      logo: '/visa.svg',
    },
    {
      id: 3,
      logo: '/visa.svg',
    },
    {
      id: 4,
      logo: '/visa.svg',
    },
    {
      id: 5,
      logo: '/visa.svg',
    },
    {
      id: 6,
      logo: '/visa.svg',
    },
    {
      id: 7,
      logo: '/visa.svg',
    },
    {
      id: 8,
      logo: '/visa.svg',
    },
    {
      id: 9,
      logo: '/visa.svg',
    },
    {
      id: 10,
      logo: '/visa.svg',
    },
  ];

  return (
    <SectionContainer className="overflow-hidden">
      <div className="relative md:[mask-image:linear-gradient(to_right,#000_80%,transparent_100%)]">
        <div className="relative md:[mask-image:linear-gradient(to_left,#000_80%,transparent_100%)]">
          <div className="infinite-slides relative flex w-max">
            {data?.map(item => (
              <div key={item.id} className="inline-block">
                <div className="relative mx-8 h-[80px] w-[80px] overflow-hidden rounded-2xl">
                  <Image
                    className="h-full w-full object-contain"
                    fill
                    src={item.logo}
                    alt="test"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
