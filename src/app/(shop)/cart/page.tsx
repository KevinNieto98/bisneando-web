'use client';

import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useMemo, useState } from 'react';

import { QuantitySelector, Title } from '@/components';
import { initialData } from '@/seed/seed';
import { IoCartOutline } from 'react-icons/io5';

// Mock: productos en carrito (puedes reemplazar por tu store real)
const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

type CartItem = {
  slug: string;
  title: string;
  price: number;
  images: string[];
  inStock?: number;
  quantity: number;
};

const toHNL = (n: number) =>
  new Intl.NumberFormat('es-HN', {
    style: 'currency',
    currency: 'HNL',
    maximumFractionDigits: 2,
  }).format(n);

export default function CartPage() {
  // Estado local de carrito
  const [items, setItems] = useState<CartItem[]>(
    productsInCart.map((p) => ({
      slug: p.slug,
      title: p.title,
      price: p.price,
      images: p.images,
      inStock: (p as any).inStock ?? 10,
      quantity: 1,
    }))
  );

  // Si quieres redirigir cuando esté vacío, descomenta:
  // if (items.length === 0) redirect('/empty');

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [items]
  );
  const shipping = 0; // ajusta si necesitas
  const taxes = 0; // ajusta si necesitas
  const total = subtotal + shipping + taxes;

  const handleRemove = (slug: string) =>
    setItems((prev) => prev.filter((it) => it.slug !== slug));

  const handleChangeQty = (slug: string, nextQty: number) =>
    setItems((prev) =>
      prev.map((it) =>
        it.slug === slug ? { ...it, quantity: Math.max(1, nextQty) } : it
      )
    );

  return (
    <div className="mx-auto mb-32 w-full max-w-6xl px-4 sm:px-6">
      <Title 
        title="Carrito" 
        icon={ <IoCartOutline className="w-5 h-5" />}
        showDivider={true}
      />

      

      {/* Layout principal */}
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Lista de items */}
        <div className="md:col-span-7">
          <div className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            {items.length !== 0 ? (
              <div className="p-10 text-center text-zinc-600">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-50 ring-1 ring-zinc-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8 text-zinc-400" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 2.25h1.5l1.5 9h12.75m-12.75 0h10.5a1.5 1.5 0 001.47-1.18l1.2-6A1.5 1.5 0 0017.67 3H6.6M16.5 21a.75.75 0 100-1.5.75.75 0 000 1.5zm-9 0a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                  </svg>
                </div>
                <p className="font-medium">Tu carrito está vacío.</p>
              </div>
            ) : (
              items.map((it) => (
                <div key={it.slug} className="flex gap-4 p-4 sm:p-5">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl ring-1 ring-zinc-200">
                    <Image
                      src={`/products/${it.images[0]}`}
                      alt={it.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/product/${it.slug}`}
                      className="line-clamp-2 font-medium text-zinc-800 hover:text-blue-600"
                      title={it.title}
                    >
                      {it.title}
                    </Link>

                    <div className="mt-1 text-sm text-zinc-500">
                      {it.inStock && it.inStock > 0 ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                          En stock: {it.inStock}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-red-500" />
                          Sin stock
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      {/* Contenedor del QuantitySelector para mantener estilo */}
                      <div className="rounded-2xl bg-zinc-50 p-2 ring-1 ring-zinc-200">
                        {/* Ajusta si tu QuantitySelector necesita props onChange */}
                        <QuantitySelector
                          quantity={it.quantity}
                          // @ts-ignore: si tu componente expone onChange
                          onChange={(q: number) => handleChangeQty(it.slug, q)}
                        />
                      </div>

                      <button
                        onClick={() => handleRemove(it.slug)}
                        aria-label="Quitar del carrito"
                        title="Quitar del carrito"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition hover:border-red-500 hover:text-red-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M9 3.75A.75.75 0 019.75 3h4.5a.75.75 0 01.75.75V5h3a.75.75 0 010 1.5h-.638l-.74 11.1A2.25 2.25 0 0114.377 20H9.623a2.25 2.25 0 01-2.245-2.4l-.74-11.1H6a.75.75 0 010-1.5h3V3.75zm1.5 3.75a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9zm3.75 0a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9zM10.5 5h3v.5h-3V5z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Precios por línea */}
                  <div className="hidden shrink-0 text-right sm:block">
                    <div className="text-sm text-zinc-500">Precio</div>
                    <div className="font-semibold text-zinc-800">
                      {toHNL(it.price)}
                    </div>
                    <div className="mt-2 text-sm text-zinc-500">Subtotal</div>
                    <div className="font-semibold text-zinc-900">
                      {toHNL(it.price * it.quantity)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Resumen (sticky en desktop) */}
        <div className="md:col-span-5">
          <div className="sticky top-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-zinc-800">
              Resumen del pedido
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="font-medium text-zinc-800">
                  {toHNL(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-600">
                <span>Envío</span>
                <span className="font-medium text-zinc-800">
                  {shipping === 0 ? 'Gratis' : toHNL(shipping)}
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-600">
                <span>Impuestos</span>
                <span className="font-medium text-zinc-800">
                  {taxes === 0 ? '-' : toHNL(taxes)}
                </span>
              </div>
              <div className="my-2 h-px bg-zinc-200" />
              <div className="flex items-center justify-between text-base">
                <span className="font-semibold text-zinc-900">Total</span>
                <span className="font-extrabold text-zinc-900">
                  {toHNL(total)}
                </span>
              </div>
            </div>

            {/* Acciones */}
            <div className="mt-5 space-y-3">
              <Link
                href="/checkout/address"
                className="flex h-12 w-full items-center justify-center rounded-full bg-blue-600 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99] gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                  <path d="M2.25 7.5A2.25 2.25 0 0 1 4.5 5.25h15A2.25 2.25 0 0 1 21.75 7.5v9a2.25 2.25 0 0 1-2.25 2.25h-15A2.25 2.25 0 0 1 2.25 16.5v-9Zm19.5 1.5v-1.5a.75.75 0 0 0-.75-.75h-18a.75.75 0 0 0-.75.75V9h19.5ZM6 13.5h3a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1 0-1.5Z"/>
                </svg>
                Ir a pagar
              </Link>

              <Link
                href="/"
                className="flex h-12 w-full items-center justify-center rounded-full bg-white font-semibold text-blue-600 ring-1 ring-zinc-200 transition hover:bg-zinc-50 active:scale-[0.99] gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                  <path d="M7.5 12a.75.75 0 0 1 .75-.75h8.19l-2.22-2.22a.75.75 0 1 1 1.06-1.06l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 0 1-1.06-1.06l2.22-2.22H8.25A.75.75 0 0 1 7.5 12Z"/>
                </svg>
                Seguir comprando
              </Link>
            </div>

            {/* Cupón (opcional) */}
            {/* 
            <div className="mt-4">
              <label className="block text-sm text-zinc-600">Cupón</label>
              <div className="mt-1 flex gap-2">
                <input
                  className="h-11 flex-1 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="CODIGO10"
                />
                <button className="h-11 rounded-xl bg-zinc-900 px-4 text-sm font-semibold text-white hover:bg-zinc-800">
                  Aplicar
                </button>
              </div>
            </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}
