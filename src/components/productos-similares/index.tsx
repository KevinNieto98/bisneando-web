import { Product } from '@/interfaces';
import { ProductGridItem } from '../products/product-grid/ProductGridItem';

interface Props {
  products: Product[];
}


export const ProductSimilares = ( { products }: Props ) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-10">
      {products.map(product => (
        <ProductGridItem
          key={product.slug}
          product={product}
        />
      ))}
    </div>
  );
};