
import { CategoriesContainer, ProductGrid, Search } from '@/components';
import { initialData } from '@/seed/seed';
import { Pagination } from '@heroui/react';

const products = initialData.products;
const categories = [{
  id_categoria: 1,
  nombre_categoria: 'Tecnologia'
},
{
  id_categoria: 2,
  nombre_categoria: 'Hogar'
},
{
  id_categoria: 3,
  nombre_categoria: 'Moda'
}
]

export default function () {
  return (
    <div>
      <div
        className='flex justify-center items-center '
      >
        <Search
          products={products}
        />
      </div>

      <CategoriesContainer categories={categories} />

      <ProductGrid
        products={products}
      />
      <div className='flex justify-center items-center'>
        <Pagination 
          showControls 
          initialPage={1} 
          total={10} 
            classNames={{
    item: "data-[selected=true]:bg-yellow-400 data-[selected=true]:text-white"
  }}
        />

      </div>
    </div>
  );
}