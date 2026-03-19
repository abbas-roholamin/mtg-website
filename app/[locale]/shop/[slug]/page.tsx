import Features from '@/components/product/detail/Features';
import SimilarProduct from '@/components/product/detail/SimilarProduct';
import Warranty from '@/components/product/detail/Warranty';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return (
    <section className="py-20">
      <div className="wrapper">
        <div className="mb-24">
          <div className="space-y-8">
            <Warranty />
            <Features />
          </div>
        </div>
        <SimilarProduct slug={slug} />
      </div>
    </section>
  );
}
