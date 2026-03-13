import Post from '@/components/blog/Post';
interface Props {
  params: Promise<{ slug: string }>;
}
export default async function Page({ params }: Props) {
  const { slug } = await params;

  return (
    <section className="py-20">
      <div className="wrapper">
        <Post slug={slug} />
      </div>
    </section>
  );
}
