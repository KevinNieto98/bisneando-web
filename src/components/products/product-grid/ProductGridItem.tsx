"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export interface Product {
  slug: string;
  title: string;
  price: number;
  images: string[];
  brand?: string;
}

interface Props {
  product: Product;
  className?: string;
}

const usePrice = (value: number) =>
  useMemo(
    () =>
      new Intl.NumberFormat("es-HN", {
        style: "currency",
        currency: "HNL",
        maximumFractionDigits: 2,
      }).format(value),
    [value]
  );

export const ProductGridItem = ({ product, className = "" }: Props) => {
  const [displayImage, setDisplayImage] = useState(
    product.images?.[0] ?? "placeholder.png"
  );
  const hasSecond = Boolean(product.images?.[1]);
  const price = usePrice(product.price);

  return (
    <div
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-2xl",
        "bg-white shadow-sm transition",
        "hover:shadow-xl hover:-translate-y-0.5",
        className,
      ].join(" ")}
    >
      <Link
        href={`/product/${product.slug}`}
        className="block focus:outline-none flex-1"
        aria-label={`Ver detalles de ${product.title}`}
      >
        <div className="relative aspect-[4/3] w-full h-48 md:h-64">
          <Image
            src={`/products/${displayImage}`}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 ease-out will-change-transform"
            onMouseEnter={() => hasSecond && setDisplayImage(product.images![1])}
            onMouseLeave={() => setDisplayImage(product.images?.[0] ?? "placeholder.png")}
          />

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-200/40 via-zinc-100/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />

          <div className="absolute inset-x-3 bottom-3 flex justify-end opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 translate-y-2">
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-md backdrop-blur">
              Ver detalles
            </span>
          </div>
        </div>
      </Link>

      <div className="mt-auto flex items-start justify-between gap-3 p-3 md:p-4 bg-zinc-50">
        <div className="min-w-0">
          {product.brand && (
            <div className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
              {product.brand}
            </div>
          )}
          <Link
            href={`/product/${product.slug}`}
            className="line-clamp-2 text-sm font-medium text-zinc-700 transition-colors hover:text-blue-600"
            title={product.title}
          >
            {product.title}
          </Link>
          <div className="mt-1 text-sm font-semibold tracking-tight text-zinc-800">
            {price}
          </div>
        </div>

        <button
          type="button"
          className="rounded-full border border-zinc-300 p-2 text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-800 active:scale-95"
          aria-label="Agregar al carrito"
          onClick={() => console.log("Agregar al carrito:", product)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="M12 5c.414 0 .75.336.75.75V11h5.25a.75.75 0 010 1.5H12.75v5.25a.75.75 0 01-1.5 0V12.5H6a.75.75 0 010-1.5h5.25V5.75c0-.414.336-.75.75-.75z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
