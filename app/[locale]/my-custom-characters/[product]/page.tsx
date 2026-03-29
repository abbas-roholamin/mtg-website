import OrderForm from '@/components/my-customer-characters/OrderForm';
import ProductGallery from '@/components/product/detail/ImageGallery';

export default function page() {
  return (
    <div className="mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="grid gap-4">
        <div>
          <h1 className="font-poppins mb-2 text-2xl font-bold sm:text-3xl">
            Domino
          </h1>
          <p className="text-base sm:text-lg">
            Crafted for smooth gameplay and lasting enjoyment, this elegant
            domino set blends tradition with quality. Ideal for collectors,
            gifts, or elevating your game night.
          </p>
        </div>
        <ProductGallery
          images={['/images/g1.png', '/images/g1.png', '/images/g1.png']}
          align="center"
        />
      </div>

      <OrderForm />
    </div>
  );
}
