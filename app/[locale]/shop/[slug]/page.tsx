import SimilarProduct from '@/components/product/SimilarProduct';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return (
    <section className="py-20">
      <div className="wrapper">
        <SimilarProduct slug={slug} />
      </div>
    </section>
  );
}
