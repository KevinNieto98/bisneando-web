import { CarouselBanner, ProductGrid, ProductSimilares, Title } from '@/components';
import { FaArrowRight, FaMobileAlt, FaLaptop, FaHeadphones, FaTv, FaCamera, FaGamepad, FaTags, FaStar } from 'react-icons/fa';
import Link from 'next/link';
import { initialData } from '@/seed/seed';

const products = initialData.products;

// Puedes ajustar estas categorías y slugs a tus rutas reales
const categories = [
  { title: 'Celulares', icon: FaMobileAlt, slug: 'celulares' },
  { title: 'Laptops', icon: FaLaptop, slug: 'laptops' },
  { title: 'Audio', icon: FaHeadphones, slug: 'audio' },
  { title: 'TVs', icon: FaTv, slug: 'tvs' },
  { title: 'Cámaras', icon: FaCamera, slug: 'camaras' },
  { title: 'Gaming', icon: FaGamepad, slug: 'gaming' },
];

export default function Home() {
  return (
    <>
      {/* Contenedor principal centrado */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <CarouselBanner />

        {/* Categorías */}
        <section className="mt-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              
              <Title 
                  icon={<FaTags className=" w-5 h-5" />}
                  title="Categorías" 
                  className="mb-0" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map(({ title, icon: Icon, slug }) => (
              <Link
                key={slug}
                href={`/category/${slug}`}
                className="group"
              >
                <div className="h-full w-full rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 p-4 flex flex-col items-center justify-center text-center hover:-translate-y-0.5">
                  <div className="rounded-xl w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-md group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <span className="mt-3 text-sm md:text-base font-medium text-gray-800">{title}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Productos Destacados */}
        <Title
          icon={<FaStar className=" w-5 h-5" />}
          title="Productos Destacados"
          className="mb-4"
        />

        <ProductSimilares products={products} />

        {/* Botón centrado y más llamativo */}
        <div className="w-full flex justify-center my-8">
          <Link href="/products" passHref legacyBehavior>
            <button className="px-10 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-2xl shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 text-base sm:text-lg flex items-center gap-2">
              Ver más
              <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
