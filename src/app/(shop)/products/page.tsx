
import { ProductGrid, Search } from '@/components';
import { initialData } from '@/seed/seed';
import { Chip } from '@/components/Chip';

const products = initialData.products;

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
      <div className="flex gap-4 mx-2 sm:mx-5 justify-center items-center overflow-x-auto whitespace-nowrap py-2">
        <Chip color="default">Default</Chip>
        <Chip color="primary">Primary</Chip>
        <Chip color="secondary">Secondary</Chip>
        <Chip color="success">Success</Chip>
        <Chip color="warning">Warning</Chip>
        <Chip color="danger">Danger</Chip>
      </div>
      <ProductGrid
        products={products}
      />
    </div>
  );
}