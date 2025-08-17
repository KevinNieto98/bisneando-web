"use client";

import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { titleFont } from "@/config/fonts";
import {
  ProductMobileSlideshow,
  ProductSimilares,
  ProductSlideshow,
  QuantitySelector,
} from "@/components";

interface Props {
  params: { slug: string };
}

const products = initialData.products.slice(0, 3);

export default function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = initialData.products.find((p) => p.slug === slug);
  if (!product) notFound();

  const brand = (product as any).brand ?? "GENÉRICO";
  const oldPrice =
    (product as any).oldPrice && (product as any).oldPrice > product.price
      ? (product as any).oldPrice
      : null;

  // Botón de compartir (Web Share API con fallback a copiar enlace)
  const handleShare = async () => {
    try {
      const url =
        typeof window !== "undefined"
          ? window.location.href
          : `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/product/${product.slug}`;
      if (typeof navigator !== "undefined" && (navigator as any).share) {
        await (navigator as any).share({
          title: product.title,
          text: `Mira este producto: ${product.title}`,
          url,
        });
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert("Enlace copiado al portapapeles");
      }
    } catch (err) {
      console.error("Share error", err);
    }
  };

  return (
    <>
      {/* Desktop altura mínima; móvil fluye para mostrar similares abajo */}
      <div className="grid md:min-h-[calc(100vh-80px)] grid-cols-1 gap-6 px-4 py-4 md:grid-cols-2 md:px-10 lg:gap-10 pb-8 md:pb-12">
        {/* Slideshow (izquierda) */}
        <div className="flex items-center justify-center">
          {/* Desktop */}
          <ProductSlideshow
            title={product.title}
            images={product.images}
            className="hidden md:block w-full max-w-2xl"
          />
          {/* Mobile */}
          <ProductMobileSlideshow
            title={product.title}
            images={product.images}
            className="block w-full md:hidden"
          />
        </div>

        {/* Detalles (derecha) */}
        <div className="flex h-full flex-col justify-center">
          {/* Marca, título, precios, stock */}
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              {brand}
            </div>

            <h1
              className={`${titleFont.className} antialiased font-extrabold text-2xl md:text-3xl`}
            >
              {product.title}
            </h1>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-extrabold text-orange-600">
                L {product.price.toLocaleString("es-HN")}
              </span>
              {oldPrice && (
                <span className="text-lg text-zinc-400 line-through">
                  L {oldPrice.toLocaleString("es-HN")}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <span
                className={`h-2 w-2 rounded-full ${
                  product.inStock > 0 ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span>
                {product.inStock > 0
                  ? `En stock: ${product.inStock} unidades`
                  : "Sin stock"}
              </span>
            </div>
          </div>

          {/* Acciones principales */}
          <div className="mt-5 flex flex-col gap-3">
            {/* Fila 1: Solicitar ayuda + Quantity en la misma línea */}
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/50400000000?text=${encodeURIComponent(
                  `Hola, necesito ayuda con ${product.title}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="h-14 flex-1 rounded-full bg-green-500 text-white shadow-md transition hover:bg-green-600 active:scale-[0.99] flex items-center justify-center gap-2 font-semibold"
              >
                {/* ícono whatsapp */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.52 3.48A11.9 11.9 0 0012.06 0C5.5 0 .18 5.32.18 11.88c0 2.1.55 4.15 1.6 5.94L0 24l6.37-1.66a11.86 11.86 0 005.7 1.46h.01c6.55 0 11.88-5.32 11.88-11.88 0-3.17-1.24-6.15-3.44-8.44zM12.08 21.3h-.01a9.39 9.39 0 01-4.79-1.3l-.34-.2-3.78.99 1-3.68-.22-.38a9.4 9.4 0 01-1.42-4.98c0-5.2 4.23-9.43 9.44-9.43a9.4 9.4 0 019.44 9.43c0 5.2-4.23 9.42-9.44 9.42zm5.24-7.06c-.29-.15-1.72-.85-1.98-.95-.26-.1-.45-.15-.64.15s-.74.95-.9 1.14-.33.22-.62.07a7.55 7.55 0 01-2.22-1.37 8.34 8.34 0 01-1.54-1.92c-.16-.3 0-.46.12-.61.12-.15.26-.33.38-.5.13-.17.16-.29.24-.48.08-.19.04-.36-.02-.5-.07-.15-.64-1.54-.88-2.1-.23-.56-.47-.48-.64-.49h-.54c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.03 2.82 1.18 3.01c.15.19 2.02 3.09 4.89 4.33.68.29 1.22.46 1.64.59.69.22 1.33.19 1.83.12.56-.08 1.72-.7 1.96-1.38.24-.68.24-1.25.17-1.38-.07-.13-.26-.2-.55-.35z" />
                </svg>
                Solicitar ayuda
              </a>

              <div className="rounded-2xl bg-white/70 p-3 shadow-sm ring-1 ring-zinc-100">
                <QuantitySelector quantity={1} />
              </div>
            </div>

            {/* Fila 2: Agregar al carrito (full width) */}
            <button className="h-14 w-full rounded-full bg-blue-600 text-white shadow-md transition hover:bg-blue-700 active:scale-[0.99] flex items-center justify-center gap-2 font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 4a1 1 0 00-1 1v1H3a1 1 0 100 2h1.09l1.6 8.02A3 3 0 008.63 19H17a1 1 0 100-2H8.63a1 1 0 01-.98-.8L7.3 14H18a2 2 0 001.96-1.59l.86-4.3A1 1 0 0019.86 7H7V5a1 1 0 00-1-1z" />
              </svg>
              Agregar al Carrito
            </button>

            {/* Fila 3: Compartir (full width) */}
            <button
              onClick={handleShare}
              className="h-12 rounded-full bg-white text-blue-600 ring-1 ring-zinc-200 shadow-sm transition hover:bg-zinc-50 active:scale-[0.99] flex items-center justify-center gap-2 font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M18 8a3 3 0 10-2.83-4H15a3 3 0 102.83 4H18zM6 14a3 3 0 10-2.83 4H3a3 3 0 102.83-4H6zm12 0a3 3 0 10-2.83 4H15a3 3 0 102.83-4H18zM8.07 13.25l7.86-4.5-.96-1.68-7.86 4.5.96 1.68zm-.96 1.68l.96 1.68 7.86-4.5-.96-1.68-7.86 4.5z" />
              </svg>
              Compartir producto
            </button>
          </div>

          {/* Descripción siempre visible */}
          <div className="mt-6">
            <h3 className="font-semibold">Descripción</h3>
            <p className="text-sm leading-relaxed text-zinc-700">
              {product.description}
            </p>
          </div>

          {/* Similares en desktop dentro de la columna */}
          <div className="mt-4 hidden md:block">
            <h2 className={`${titleFont.className} text-base font-bold mt-2`}>
              Productos Similares
            </h2>
            <ProductSimilares products={products} />
          </div>
        </div>
      </div>

      {/* Similares siempre abajo en móvil */}
      <div className="px-4 pb-24 md:hidden">
        <h2 className={`${titleFont.className} text-base font-bold mt-2`}>
          Productos Similares
        </h2>
        <ProductSimilares products={products} />
      </div>
    </>
  );
}
