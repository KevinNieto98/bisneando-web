"use client";

import Link from "next/link";
import {
  IoArrowBack,
  IoDocumentTextOutline,
  IoShieldCheckmarkOutline,
  IoCubeOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";

type LegalItem = {
  href: string;
  title: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const items: LegalItem[] = [
  {
    href: "/terms-and-conditions",
    title: "Términos y Condiciones",
    description: "Condiciones de uso del servicio y responsabilidades.",
    Icon: IoDocumentTextOutline,
  },
  {
    href: "/privacy-policy",
    title: "Política de Privacidad",
    description: "Cómo recopilamos, usamos y protegemos tus datos.",
    Icon: IoShieldCheckmarkOutline,
  },
  {
    href: "/shipping-policy",
    title: "Política de Envío",
    description: "Procesamiento, tiempos, costos y seguimiento de envíos.",
    Icon: IoCubeOutline,
  },
];

export default function LegalMenuPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Información legal</h1>
        <Link
          href="/"
          className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
        >
          <IoArrowBack className="h-4 w-4" />
          Regresar
        </Link>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(({ href, title, description, Icon }) => (
          <Link
            key={href}
            href={href}
            className="group relative rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-gray-100 p-3 shrink-0">
                <Icon className="h-6 w-6 text-gray-700" />
              </div>

              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                  {description}
                </p>
              </div>

              <IoChevronForwardOutline className="ml-auto mt-1 h-5 w-5 text-gray-400 group-hover:text-gray-600 transition" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
