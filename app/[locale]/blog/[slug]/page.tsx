import Post from '@/components/blog/Post';
import Section from '@/components/common/Section';
import Wrapper from '@/components/common/Wrapper';
interface Props {
  params: Promise<{ slug: string }>;
}
export default async function Page({ params }: Props) {
  const { slug } = await params;

  return (
    <Section>
      <Wrapper>
        <Post slug={slug} />
      </Wrapper>
    </Section>
  );
}
