"use client";

import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      {/* Header con botón de regresar */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          Términos y Condiciones
        </h1>
        <Link
          href="/"
          className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
        >
          <IoArrowBack className="h-4 w-4" />
          Regresar
        </Link>
      </div>

      <p className="text-gray-600">
        Bienvenido a nuestra aplicación. Al acceder o utilizar nuestros
        servicios, aceptas los siguientes términos y condiciones. Te pedimos que
        leas este documento detenidamente.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
        1. Aceptación de los términos
      </h2>
      <p className="text-gray-600">
        Al usar nuestra plataforma, aceptas cumplir con estos términos. Si no
        estás de acuerdo, por favor no uses nuestros servicios.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
        2. Uso permitido
      </h2>
      <p className="text-gray-600">
        El contenido de esta aplicación es para tu uso personal y no comercial.
        No puedes copiar, distribuir ni modificar ningún material sin nuestro
        consentimiento previo por escrito.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
        3. Privacidad
      </h2>
      <p className="text-gray-600">
        Respetamos tu privacidad. Consulta nuestra Política de Privacidad para
        conocer cómo tratamos tus datos personales.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
        4. Limitación de responsabilidad
      </h2>
      <p className="text-gray-600">
        No nos hacemos responsables por daños directos o indirectos derivados
        del uso de nuestra plataforma. El uso de los servicios es bajo tu propio
        riesgo.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
        5. Modificaciones
      </h2>
      <p className="text-gray-600">
        Nos reservamos el derecho de actualizar estos términos en cualquier
        momento. Te notificaremos sobre cambios importantes publicando la nueva
        versión en esta página.
      </p>

      <p className="text-gray-600 mt-10">
        Última actualización: 19 de agosto de 2025
      </p>
    </div>
  );
}
