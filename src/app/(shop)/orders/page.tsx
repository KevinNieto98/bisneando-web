"use client";

import Link from "next/link";
import { Title } from "@/components";
import {
  IoTimeOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoCalendarOutline,
  IoCubeOutline,
  IoWalletOutline,
  IoPricetagOutline,
} from "react-icons/io5";

// Utilidades: formatear Lempiras y fecha
const formatHNL = (n: number) =>
  new Intl.NumberFormat("es-HN", { style: "currency", currency: "HNL" }).format(n);
const formatDate = (d: string | Date) =>
  new Intl.DateTimeFormat("es-HN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(d));

type Order = {
  id: string | number;
  fullName: string;
  productCount: number;
  totalHNL: number;
  createdAt: string | Date;
  status: "en_progreso" | "pagada" | "rechazada";
};

// Demo data — reemplaza con tus datos reales
const demoOrders: Order[] = [
  { id: 123, fullName: "Mark", productCount: 3, totalHNL: 1850, createdAt: "2025-08-10", status: "pagada" },
  { id: 124, fullName: "Sofía", productCount: 1, totalHNL: 499, createdAt: "2025-08-12", status: "en_progreso" },
  { id: 125, fullName: "Carlos", productCount: 2, totalHNL: 2100, createdAt: "2025-08-13", status: "rechazada" },
];

// Mapeo estado -> UI (puro Tailwind)
const statusMap = {
  en_progreso: {
    label: "En progreso",
    Icon: IoTimeOutline,
    badge: "bg-amber-100 text-amber-700 border border-amber-200",
    icon: "text-amber-600",
  },
  pagada: {
    label: "Pagada",
    Icon: IoCheckmarkCircle,
    badge: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    icon: "text-emerald-600",
  },
  rechazada: {
    label: "Rechazada",
    Icon: IoCloseCircle,
    badge: "bg-rose-100 text-rose-700 border border-rose-200",
    icon: "text-rose-600",
  },
} as const;

export default function OrdersPage({ orders = demoOrders as Order[] }: { orders?: Order[] }) {
  return (
    <div className="space-y-6 mb-10">
      <Title title="Orders" />

      {/* Grid de tarjetas */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((o) => {
          const s = statusMap[o.status];
          const isPaid = o.status === "pagada";

          return (
            <div
              key={o.id}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition p-5 flex flex-col gap-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <IoPricetagOutline className="h-4 w-4 opacity-70" />
                  <span className="text-gray-500">ID</span>
                  <span className="font-semibold text-gray-900">{o.id}</span>
                </div>

                <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-[11px] rounded-full ${s.badge}`}>
                  <s.Icon className={`h-3.5 w-3.5 ${s.icon}`} />
                  <span className="uppercase tracking-wide">{s.label}</span>
                </span>
              </div>

              {/* Contenido */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Cliente</p>
                  <p className="font-medium text-gray-900 leading-tight">{o.fullName}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <IoCubeOutline className="h-4 w-4 opacity-70" />
                    <div>
                      <p className="text-xs text-gray-500">Productos</p>
                      <p className="font-semibold text-gray-900">{o.productCount}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <IoWalletOutline className={`h-4 w-4 ${isPaid ? "" : "opacity-70"}`} />
                    <div>
                      <p className="text-xs text-gray-500">Total pagado</p>
                      <p className={`font-semibold ${isPaid ? "text-gray-900" : "line-through text-gray-400"}`}>
                        {formatHNL(o.totalHNL)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 col-span-2">
                    <IoCalendarOutline className="h-4 w-4 opacity-70" />
                    <div>
                      <p className="text-xs text-gray-500">Fecha de la orden</p>
                      <p className="font-semibold text-gray-900">{formatDate(o.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-1">
                <div className="text-xs text-gray-500">
                  Estado actual: <span className="font-medium text-gray-900">{s.label}</span>
                </div>
                <Link
                  href={`/orders/${o.id}`}
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Ver orden completa
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
