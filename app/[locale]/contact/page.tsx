import Branch from '@/components/sections/Branch';
import Contact from '@/components/sections/Contact';
import Faq from '@/components/sections/Faq';

export default async function Page() {
  return (
    <div className="py-20">
      <div className="wrapper">
        <div className="space-y-24 md:space-y-32 lg:space-y-40">
          <Contact />
          <Branch />
          <Faq />
        </div>
      </div>
    </div>
  );
}
