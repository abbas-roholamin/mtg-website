import Image from 'next/image';

function ServicesCard(props: {
  image: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl bg-neutral-50 p-4 lg:gap-1 xl:p-6">
      <div className="w-max rounded-md bg-neutral-200 p-2">
        <div className="relative size-6 xl:size-7">
          <Image src={props.image} alt="logo" fill className="object-cover" />
        </div>
      </div>
      <p className="mt-2 text-lg font-semibold xl:text-xl">{props.title}</p>
      <p className="text-sm xl:text-base">{props.description}</p>
    </div>
  );
}

export default ServicesCard;
