import Image from 'next/image';

function ServicesCard(props: {
  image: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-2.5 rounded-2xl bg-neutral-50 p-6">
      <div className="w-max rounded-md bg-neutral-200 p-2">
        <div className="relative size-7">
          <Image src={props.image} alt="logo" fill className="object-cover" />
        </div>
      </div>
      <p className="mt-0.5 text-[20px] font-semibold">{props.title}</p>
      <p>{props.description}</p>
    </div>
  );
}

export default ServicesCard;
