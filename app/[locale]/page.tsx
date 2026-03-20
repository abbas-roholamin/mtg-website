import Banner from '@/components/home/Banner';
import Clients from '@/components/home/Clients';
import Falling from '@/components/home/Falling';
import Hero from '@/components/home/Hero';
import PlayAnywhere from '@/components/home/PlayAnywhere';
import WhereToPlay from '@/components/home/WhereToPlay';
import WaysToShop from '@/components/home/WaysToShop';
import WhoWeAre from '@/components/home/WhoWeAre';
import Faq from '@/components/sections/Faq';
import Inaction from '@/components/sections/InAction';
import FeaturedProduct from '@/components/home/FeaturedProduct';

export default async function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <WhoWeAre />
      <WhereToPlay />
      <PlayAnywhere />
      <WaysToShop />
      <Falling />
      <FeaturedProduct />
      <Inaction />
      <Faq />
      <Banner />
    </>
  );
}
