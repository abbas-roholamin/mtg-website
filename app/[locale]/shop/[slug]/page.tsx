import Section from '@/components/common/Section';
import Wrapper from '@/components/common/Wrapper';
import Features from '@/components/product/detail/Features';
import Product from '@/components/product/detail/Product';
import SimilarProduct from '@/components/product/detail/SimilarProduct';
import Warranty from '@/components/product/detail/Warranty';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return (
    <Section>
      <Wrapper>
        <div className="mb-24">
          <Product slug={slug} />
          <div className="space-y-8">
            <Warranty />
            <Features />
          </div>
        </div>
        <SimilarProduct slug={slug} />
      </Wrapper>
    </Section>
  );
}
