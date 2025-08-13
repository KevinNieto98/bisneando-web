
import { ProductGrid, Search } from '@/components';
import { initialData } from '@/seed/seed';

const products = initialData.products;

export default function() {
  return (
    <div>
      <div
        className='flex justify-center items-center mx-5 '
      >
      <Search 
        products={products}
      />

      </div>
        <ProductGrid 
          products={ products }
        />
    </div>
  );
}