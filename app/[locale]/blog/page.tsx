import BlogList from '@/components/blog/BlogList';

export default function Page() {
  return (
    <section className="py-20">
      <div className="wrapper">
        <h1 className="text-primary font-quick-sand mb-12 text-center text-7xl font-bold">
          Blog
        </h1>
        <BlogList />
      </div>
    </section>
  );
}
