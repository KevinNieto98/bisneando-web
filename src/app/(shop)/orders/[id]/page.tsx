"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Home,
  Building2,
  CreditCard,
  Wallet,
  Edit,
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Hourglass,
  CheckCircle,
  Clock,
} from "lucide-react";

import { Title } from "@/components";
import { initialData } from "@/seed/seed";

// --- Mock: productos de la orden ---
const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

const DEFAULT_QTY = 3;

// --- Mock: direcciones ---
const addresses = [
  {
    id: "addr_1",
    label: "Casa - Fernando Herrera",
    name: "Fernando Herrera",
    line1: "Av. Siempre viva 123",
    line2: "Col. Centro",
    city: "Ciudad de México",
    state: "CDMX",
    zip: "123123",
    phone: "123.123.123",
    isDefault: true,
    icon: <Home className="w-5 h-5 mr-2" />,
  },
  {
    id: "addr_2",
    label: "Oficina",
    name: "Fernando Herrera",
    line1: "Insurgentes Sur 456",
    line2: "Piso 7, Col. Roma",
    city: "Ciudad de México",
    state: "CDMX",
    zip: "06000",
    phone: "555.555.555",
    isDefault: false,
    icon: <Building2 className="w-5 h-5 mr-2" />,
  },
];

// --- Mock: estado y pago de la orden ---
// Cambia estos valores según el id o tus datos reales
const mockOrderMeta = (id: string | number) => {
  if (String(id) === "125") {
    return {
      status: "rechazada" as const,
      rejectionReason: "El banco rechazó la transacción: fondos insuficientes.",
      payment: { method: "tarjeta" as const, last4: "4242" },
    };
  }

  if (String(id) === "124") {
    return {
      status: "en_progreso" as const,
      payment: { method: "efectivo" as const },
    };
  }

  return {
    status: "pagada" as const,
    payment: { method: "tarjeta" as const, last4: "1337" },
  };
};

// Helpers
const currency = (n: number) =>
  new Intl.NumberFormat("es-HN", { style: "currency", currency: "HNL" }).format(n);

const maskCard = (last4?: string) => (last4 ? `•••• •••• •••• ${last4}` : "Tarjeta");

// UI map para status
const statusConf: Record<
  "en_progreso" | "pagada" | "rechazada",
  { label: string; color: string; Icon: any; badge: string }
> = {
  en_progreso: {
    label: "En progreso",
    color: "text-amber-700",
    Icon: Hourglass,
    badge: "bg-amber-100 text-amber-700 border border-amber-200",
  },
  pagada: {
    label: "Pagada",
    color: "text-emerald-700",
    Icon: CheckCircle2,
    badge: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  },
  rechazada: {
    label: "Rechazada",
    color: "text-rose-700",
    Icon: XCircle,
    badge: "bg-rose-100 text-rose-700 border border-rose-200",
  },
};

interface Props {
  params: { id: string };
}

export default function OrderDetailPage({ params }: Props) {
  const { id } = params;

  // Datos de ejemplo; integra tu fetch real por id
  const meta = mockOrderMeta(id);
  const s = statusConf[meta.status];

  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.find((a) => a.isDefault)?.id ?? addresses[0].id
  );

  const items = useMemo(
    () =>
      productsInCart.map((p) => ({
        ...p,
        qty: DEFAULT_QTY,
        subtotal: p.price * DEFAULT_QTY,
      })),
    []
  );

  const summary = useMemo(() => {
    const itemsCount = items.reduce((acc, it) => acc + it.qty, 0);
    const subtotal = items.reduce((acc, it) => acc + it.subtotal, 0);
    const taxes = Math.round(subtotal * 0.15 * 100) / 100;
    const total = Math.round((subtotal + taxes) * 100) / 100;
    return { itemsCount, subtotal, taxes, total };
  }, [items]);

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  return (
    <div className="flex justify-center items-start mb-32 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col w-full max-w-[1100px]">
        <div className="flex items-center justify-between mb-6">
          <Title icon={<ClipboardCheck className="w-5 h-5" />} title={`Orden #${id}`} />

          <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${s.badge}`}
          >
            <s.Icon className="w-4 h-4" />
            <span className="uppercase tracking-wide">{s.label}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-2">
          {/* Columna derecha en desktop, primera en móvil: Resumen */}
          <aside className="order-first lg:order-none lg:col-span-1">
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
                <span className="text-right">{currency(summary.subtotal)}</span>

                <span>Impuestos (15%)</span>
                <span className="text-right">{currency(summary.taxes)}</span>

                <span className="mt-3 text-lg font-semibold">Total:</span>
                <span className="mt-3 text-lg font-semibold text-right">{currency(summary.total)}</span>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Al hacer clic en "Colocar orden", aceptas nuestros {" "}
                <a href="#" className="underline">
                  términos y condiciones
                </a>{" "}
                y {" "}
                <a href="#" className="underline">
                  política de privacidad
                </a>.
              </p>

              <div className="mt-5 space-y-2">
                {/* Botón de estado: div con ícono según status */}
                <div
                  className={`w-full flex justify-center items-center gap-2 rounded-xl py-3 text-center text-white font-medium ${
                    meta.status === "pagada"
                      ? "bg-emerald-600"
                      : meta.status === "en_progreso"
                      ? "bg-amber-600"
                      : "bg-rose-600"
                  }`}
                >
                  {meta.status === "pagada" ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Orden Pagada</span>
                    </>
                  ) : meta.status === "en_progreso" ? (
                    <>
                      <Clock className="w-5 h-5" />
                      <span>Orden en Progreso</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5" />
                      <span>Orden Rechazada</span>
                    </>
                  )}
                </div>

                <Link
                  href="/orders"
                  className="w-full flex justify-center items-center rounded-xl py-3 text-center border border-gray-300 hover:bg-gray-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Regresar
                </Link>
              </div>
            </div>
          </aside>

          {/* Columna izquierda en desktop, segunda en móvil: Carrito y detalles */}
          <section className="lg:col-span-2 order-last lg:order-none space-y-6">
            {/* Carrito */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Productos de la orden</h2>
                <Link
                  href="/cart"
                  className="flex items-center gap-2 text-sm border rounded-xl px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Ver carrito
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
                      <p className="text-sm text-gray-500">${product.price} x {DEFAULT_QTY}</p>
                      <p className="font-semibold mt-1">Subtotal: ${product.subtotal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dirección de entrega (selección) */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Dirección de entrega</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <button
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`text-left rounded-2xl border p-5 transition-all hover:shadow-md focus:outline-none ${
                      selectedAddressId === addr.id
                        ? "border-black shadow-lg ring-2 ring-black/10"
                        : "border-gray-200"
                    }`}
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

            {/* Método de pago (solo visual: proviene de la orden) */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3">Método de pago</h2>
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 p-5">
                {meta.payment.method === "tarjeta" ? (
                  <CreditCard className="w-5 h-5" />
                ) : (
                  <Wallet className="w-5 h-5" />
                )}
                <div>
                  <p className="font-semibold capitalize">
                    {meta.payment.method === "tarjeta"
                      ? `Tarjeta • ${maskCard(meta.payment.last4)}`
                      : "Efectivo"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {meta.payment.method === "tarjeta"
                      ? "Se mostrarán solo los últimos 4 dígitos."
                      : "Pago contra entrega."}
                  </p>
                </div>
              </div>

              {/* Estado de la orden y mensaje de rechazo si aplica */}
              <div className="mt-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${s.badge}`}>
                  <s.Icon className="w-4 h-4" />
                  <span className="uppercase tracking-wide">{s.label}</span>
                </div>
                {meta.status === "rechazada" && (
                  <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
                    <p className="text-sm font-medium">Motivo del rechazo</p>
                    <p className="text-sm">{meta.rejectionReason ?? "No especificado."}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
