'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, ArrowLeft, Truck } from 'lucide-react'

export default function SuccessOrderPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id') || 'ORD-123456'

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="w-20 h-20 text-green-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">¡Hemos recibido tu pedido!</h1>
        <p className="text-gray-600 mb-6">
          Muy pronto nos comunicaremos contigo para confirmar los detalles y avanzar con el envío.
        </p>

        <div className="rounded-xl border border-gray-200 p-4 mb-6 inline-block text-left">
          <p className="text-sm text-gray-500">ID de la orden</p>
          <p className="text-lg font-semibold tracking-wide">{orderId}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 border rounded-xl px-4 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Regresar a productos
          </Link>

          <Link
            href="/orders"
            className="flex items-center justify-center gap-2 btn-primary rounded-xl px-4 py-2.5"
          >
            <Truck className="w-4 h-4" />
            Dar seguimiento a la orden
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Consejo: Guarda tu ID para futuras consultas.
        </p>
      </div>
    </div>
  )
}
