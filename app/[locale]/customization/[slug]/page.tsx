import Section from '@/components/common/Section';
import Wrapper from '@/components/common/Wrapper';
import Customization from '@/components/custom/Customization';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return (
    <Section>
      <Wrapper>
        <Customization slug={slug} />
      </Wrapper>
    </Section>
  );
}
