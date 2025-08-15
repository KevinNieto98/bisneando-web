
import { CategoriesContainer, Pagination, ProductGrid, Search } from '@/components';
import { PaginationContainer } from '@/components/pagination-container';
import { initialData } from '@/seed/seed';

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
      <PaginationContainer />
    </div>
  );
}