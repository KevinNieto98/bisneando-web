"use client"
import { Product } from '@/interfaces';
import { Autocomplete, AutocompleteItem } from '@heroui/react';
import { useState } from 'react';

interface Props {
  products: Product[];
}

interface SearchIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
  width?: number | string;
  height?: number | string;
}

const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}: SearchIconProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export const Search = ({ products }: Props) => {
  const [inputValue, setInputValue] = useState("");

  // Solo mostrar productos si hay al menos 3 caracteres
  const showOptions = inputValue.length >= 3;
  const filteredProducts = showOptions
    ? products.filter(product =>
        product.title.toLowerCase().includes(inputValue.toLowerCase())
      )
    : [];

  return (
    <div className="w-full mb-2 max-w-full overflow-x-hidden px-2 sm:px-5 flex bg-gray-100 rounded-full relative">
      <Autocomplete
        aria-label="Buscar producto"
        classNames={{
          base: "w-full",
          listboxWrapper: "max-h-[320px]",
          selectorButton: "text-default-500",
        }}
        inputValue={inputValue}
        onInputChange={setInputValue}
        defaultItems={showOptions ? filteredProducts : []} // <-- importante
        inputProps={{
          classNames: {
            input: "ml-1 w-full bg-transparent focus:outline-none focus:ring-0 focus:border-transparent",
            inputWrapper: "h-[48px] w-full bg-transparent shadow-none border-none focus:outline-none focus:ring-0 focus:border-transparent",
          },
        }}
        listboxProps={{
          hideSelectedIcon: false,
          itemClasses: {
            base: [
              "text-default-500",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "hover:bg-gray-200",
              "hover:text-black",
              "cursor-pointer",
              "px-5",
            ],
          },
        }}
        popoverProps={{
          className: !showOptions ? "hidden" : "",
          classNames: {
            base: "bg-white dark:bg-gray-100  rounded-md shadow-lg",
          },
        }}
        placeholder="Buscar producto..."
        startContent={<SearchIcon className="text-default-400" size={20} strokeWidth={2.5} />}
        isLoading={false}
        isDisabled={false}
      >
        {showOptions && filteredProducts.length > 0
          ? filteredProducts.map((item) => (
              <AutocompleteItem key={item.id_producto} textValue={item.title} className='w-full'>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <span className="text-small">{item.title}</span>
                    </div>
                  </div>
                </div>
              </AutocompleteItem>
            ))
          : null
        }
      </Autocomplete>
      {/* Mensaje personalizado */}
      {inputValue.length > 0 && (!showOptions ? (
        <span className="block px-5 py-2 text-gray-400 absolute mt-14 bg-white rounded shadow z-50">
          Debes escribir al menos 3 caracteres
        </span>
      ) : filteredProducts.length === 0 && showOptions ? (
        <span className="block px-5 py-2 text-gray-400 absolute mt-14 bg-white rounded shadow z-50">
          No hay resultados
        </span>
      ) : null)}
    </div>
  );
};