'use client';


import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/interfaces';
import { useState } from 'react';

interface Props {
  product: Product;
}


export const ProductGridItem = ( { product }: Props ) => {

  const [ displayImage, setDisplayImage ] = useState( product.images[ 0 ] );


  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={ `/product/${ product.slug }` }>
        <Image
          src={ `/products/${ displayImage }` }
          alt={ product.title }
          className="w-full object-cover rounded h-40 md:h-[300px]"
          width={ 300 }
          height={ 300 }
          onMouseEnter={ () => setDisplayImage( product.images[1] )  }
          onMouseLeave={ () => setDisplayImage( product.images[0] ) }
        />
      </Link>

      <div className="p-2 md:p-4 flex flex-col">
        <Link
          className="hover:text-blue-600 text-xs md:text-base"
          href={ `/product/${ product.slug }` }>
          { product.title }
        </Link>
        <span className="font-bold text-xs md:text-base">${ product.price }</span>
      </div>

    </div>
  );
};