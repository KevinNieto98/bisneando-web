
import { ProductGrid, Search } from '@/components';
import { initialData } from '@/seed/seed';
import {Autocomplete, AutocompleteItem} from "@heroui/react";


const products = initialData.products;

export default function() {
  return (
    <div>

      <h1>Products Page</h1>
      <Search 
        products={products}
      />
        <ProductGrid 
          products={ products }
        />
    </div>
  );
}