import { CarouselBanner, ProductGrid, ProductSimilares, Title } from '@/components';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { initialData } from '@/seed/seed';


const products = initialData.products;



export default function Home() {
  return (
    <>
      <CarouselBanner />
      <div 
        className='mx-5'
      >

      <Title
        title="  Productos Destacados"
        className="mx-5 mb-2"
      />


    <div className='mx-5'>
      <ProductSimilares 
        products={ products }
      />
      <div className="w-full flex justify-center mb-5">
        <Link href="/products" passHref legacyBehavior>
          <button className="px-10 py-2 sm:px-6 sm:py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-base sm:text-lg flex items-center gap-2">
            Ver más
            <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </Link>
      </div>
    </div>


      </div>
      
    </>
  );
}
