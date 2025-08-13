"use client"
import { Product } from '@/interfaces';
import { Autocomplete, AutocompleteItem } from '@heroui/react';

interface Props {
  products: Product[];
}


export const Search = ( { products }: Props ) => {
  return (
        <div>
      <Autocomplete className="max-w-xs" placeholder="Buscar producto...">
        {products.map((product) => (
          <AutocompleteItem
            key={String(product.id_producto)}       // clave como string
            textValue={String(product.title)}       // texto para búsqueda
          >
            {String(product.title)}                 {/* hijo como string */}
          </AutocompleteItem>
        ))}
      </Autocomplete>

    </div>
  );
};