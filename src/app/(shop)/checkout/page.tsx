'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Home, Building2, CreditCard, Wallet, Edit, ClipboardCheck } from 'lucide-react'

import { Title } from '@/components'
import { initialData } from '@/seed/seed'

// --- Mock: productos en el carrito ---
const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

const DEFAULT_QTY = 3

// --- Mock: direcciones ---
const addresses = [
  {
    id: 'addr_1',
    label: 'Casa - Fernando Herrera',
    name: 'Fernando Herrera',
    line1: 'Av. Siempre viva 123',
    line2: 'Col. Centro',
    city: 'Ciudad de México',
    state: 'CDMX',
    zip: '123123',
    phone: '123.123.123',
    isDefault: true,
    icon: <Home className="w-5 h-5 mr-2" />,
  },
  {
    id: 'addr_2',
    label: 'Oficina',
    name: 'Fernando Herrera',
    line1: 'Insurgentes Sur 456',
    line2: 'Piso 7, Col. Roma',
    city: 'Ciudad de México',
    state: 'CDMX',
    zip: '06000',
    phone: '555.555.555',
    isDefault: false,
    icon: <Building2 className="w-5 h-5 mr-2" />,
  },
]

export default function CheckoutRedesignPage() {
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.find((a) => a.isDefault)?.id ?? addresses[0].id
  )

  const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'tarjeta' | ''>('')

  const [cardForm, setCardForm] = useState({
    holder: '',
    number: '',
    expiry: '',
    cvv: '',
    save: true,
  })

  const items = useMemo(
    () =>
      productsInCart.map((p) => ({
        ...p,
        qty: DEFAULT_QTY,
        subtotal: p.price * DEFAULT_QTY,
      })),
    []
  )

  const summary = useMemo(() => {
    const itemsCount = items.reduce((acc, it) => acc + it.qty, 0)
    const subtotal = items.reduce((acc, it) => acc + it.subtotal, 0)
    const taxes = Math.round(subtotal * 0.15 * 100) / 100
    const total = Math.round((subtotal + taxes) * 100) / 100
    return { itemsCount, subtotal, taxes, total }
  }, [items])

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId)

  const isCardValid = useMemo(() => {
    if (paymentMethod !== 'tarjeta') return true
    const { holder, number, expiry, cvv } = cardForm
    return (
      holder.trim().length > 3 &&
      number.replace(/\s/g, '').length >= 15 &&
      /\d{2}\/\d{2}/.test(expiry) &&
      cvv.length >= 3
    )
  }, [paymentMethod, cardForm])

  const canPlaceOrder = selectedAddressId && paymentMethod && isCardValid

  return (
    <div className="flex justify-center items-start mb-32 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col w-full max-w-[1100px]">
        <div className="flex items-center justify-between mb-6">
          <Title 
            icon={<ClipboardCheck className="w-5 h-5" />}
            title="Verificar orden" />
          <Link
            href="/cart"
            className="flex items-center gap-2 text-sm border rounded-xl px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Regresar al carrito
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-2">
          {/* Columna izquierda: Carrito */}
          <section className="lg:col-span-2 space-y-6">
            {/* Carrito */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Tu carrito</h2>
                <Link
                  href="/cart"
                  className="flex items-center gap-2 text-sm border rounded-xl px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Editar carrito
                </Link>
              </div>

              <div className="divide-y">
                {items.map((product) => (
                  <div key={product.slug} className="py-4 flex items-center gap-4">
                    <Image
                      src={`/products/${product.images[0]}`}
                      width={96}
                      height={96}
                      alt={product.title}
                      className="rounded-xl object-cover w-24 h-24"
                    />

                    <div className="flex-1">
                      <p className="font-medium leading-tight">{product.title}</p>
                      <p className="text-sm text-gray-500">
                        ${product.price} x {product.qty}
                      </p>
                      <p className="font-semibold mt-1">
                        Subtotal: ${product.subtotal}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selector de Dirección */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Dirección de entrega</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <button
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={
                      `text-left rounded-2xl border p-5 transition-all hover:shadow-md focus:outline-none ` +
                      (selectedAddressId === addr.id
                        ? 'border-black shadow-lg ring-2 ring-black/10'
                        : 'border-gray-200')
                    }
                    aria-pressed={selectedAddressId === addr.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center">
                        {addr.icon}
                        <div>
                          <p className="font-semibold">{addr.label}</p>
                          <p className="text-sm text-gray-600">{addr.name}</p>
                          <p className="text-sm text-gray-600">{addr.line1}</p>
                          <p className="text-sm text-gray-600">{addr.line2}</p>
                          <p className="text-sm text-gray-600">
                            {addr.city}, {addr.state} {addr.zip}
                          </p>
                          <p className="text-sm text-gray-600">{addr.phone}</p>
                        </div>
                      </div>
                      {selectedAddressId === addr.id && (
                        <span className="inline-flex shrink-0 rounded-full bg-black text-white text-xs px-2 py-1">
                          Seleccionada
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-3 text-sm">
                <Link href="/account" className="underline">
                  Administrar direcciones
                </Link>
              </div>
            </div>

            {/* Método de pago */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Método de pago</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod('efectivo')}
                  className={
                    `flex items-start gap-2 rounded-2xl border p-5 text-left transition-all hover:shadow-md ` +
                    (paymentMethod === 'efectivo'
                      ? 'border-black shadow-lg ring-2 ring-black/10'
                      : 'border-gray-200')
                  }
                >
                  <Wallet className="w-5 h-5 mt-1" />
                  <div>
                    <p className="font-semibold">Efectivo</p>
                    <p className="text-sm text-gray-600">Paga al recibir el pedido.</p>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('tarjeta')}
                  className={
                    `flex items-start gap-2 rounded-2xl border p-5 text-left transition-all hover:shadow-md ` +
                    (paymentMethod === 'tarjeta'
                      ? 'border-black shadow-lg ring-2 ring-black/10'
                      : 'border-gray-200')
                  }
                >
                  <CreditCard className="w-5 h-5 mt-1" />
                  <div>
                    <p className="font-semibold">Tarjeta de crédito / débito</p>
                    <p className="text-sm text-gray-600">Visa, Mastercard, Amex.</p>
                  </div>
                </button>
              </div>

              {paymentMethod === 'tarjeta' && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium">
                      Titular de la tarjeta
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/20"
                      placeholder="Como aparece en la tarjeta"
                      value={cardForm.holder}
                      onChange={(e) =>
                        setCardForm((f) => ({ ...f, holder: e.target.value }))
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium">Número de tarjeta</label>
                    <input
                      inputMode="numeric"
                      className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 tracking-widest focus:outline-none focus:ring-2 focus:ring-black/20"
                      placeholder="0000 0000 0000 0000"
                      value={cardForm.number}
                      onChange={(e) =>
                        setCardForm((f) => ({ ...f, number: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Expiración (MM/AA)</label>
                    <input
                      inputMode="numeric"
                      className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/20"
                      placeholder="MM/AA"
                      value={cardForm.expiry}
                      onChange={(e) =>
                        setCardForm((f) => ({ ...f, expiry: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">CVV</label>
                    <input
                      inputMode="numeric"
                      className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/20"
                      placeholder="***"
                      value={cardForm.cvv}
                      onChange={(e) =>
                        setCardForm((f) => ({ ...f, cvv: e.target.value }))
                      }
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-2">
                    <input
                      id="save-card"
                      type="checkbox"
                      checked={cardForm.save}
                      onChange={(e) =>
                        setCardForm((f) => ({ ...f, save: e.target.checked }))
                      }
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor="save-card" className="text-sm text-gray-700">
                      Guardar tarjeta para futuras compras
                    </label>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Columna derecha: Resumen */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-4">Resumen de orden</h3>

              {/* Dirección seleccionada (mini) */}
              <div className="mb-5">
                <p className="text-sm text-gray-500 mb-1">Entrega a:</p>
                {selectedAddress ? (
                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="font-medium">{selectedAddress.label}</p>
                    <p className="text-sm text-gray-600">{selectedAddress.line1}</p>
                    <p className="text-sm text-gray-600">
                      {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zip}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-red-600">Selecciona una dirección</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span>No. Productos</span>
                <span className="text-right">{summary.itemsCount} artículos</span>

                <span>Subtotal</span>
                <span className="text-right">${summary.subtotal}</span>

                <span>Impuestos (15%)</span>
                <span className="text-right">${summary.taxes}</span>

                <span className="mt-3 text-lg font-semibold">Total:</span>
                <span className="mt-3 text-lg font-semibold text-right">${summary.total}</span>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Al hacer clic en "Colocar orden", aceptas nuestros{' '}
                <a href="#" className="underline">
                  términos y condiciones
                </a>{' '}
                y{' '}
                <a href="#" className="underline">
                  política de privacidad
                </a>.
              </p>

              <div className="mt-5">
                <Link
                  className={`btn-primary w-full flex justify-center items-center rounded-xl py-3 text-center ${
                    canPlaceOrder ? '' : 'pointer-events-none opacity-60'
                  }`}
                  href={canPlaceOrder ? '/orders/123' : '#'}
                  aria-disabled={!canPlaceOrder}
                >
                  Colocar orden
                </Link>
                {!canPlaceOrder && (
                  <p className="text-xs text-red-600 mt-2">
                    {paymentMethod === 'tarjeta' && !isCardValid
                      ? 'Completa los datos de la tarjeta para continuar.'
                      : 'Selecciona dirección y método de pago para continuar.'}
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
