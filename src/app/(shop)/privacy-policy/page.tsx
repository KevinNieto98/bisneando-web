"use client";

import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      {/* Header con botón de regresar */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Política de Envío</h1>
        <Link
          href="/"
          className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
        >
          <IoArrowBack className="h-4 w-4" />
          Regresar
        </Link>
      </div>

      <p className="text-gray-600">
        Esta Política de Envío describe los términos y condiciones aplicables al envío de los
        productos adquiridos a través de nuestra plataforma.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">1. Procesamiento de pedidos</h2>
        <p className="text-gray-600">
          Todos los pedidos se procesan en un plazo de 1 a 3 días hábiles después de la confirmación
          del pago. Los pedidos realizados durante fines de semana o feriados se procesarán el siguiente
          día hábil.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">2. Opciones de envío</h2>
        <p className="text-gray-600">
          Ofrecemos distintos métodos de envío que podrás seleccionar al momento de la compra.
          Los tiempos de entrega varían según tu ubicación y el método de envío elegido.
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-1">
          <li><span className="font-medium">Envío estándar:</span> 3 a 7 días hábiles.</li>
          <li><span className="font-medium">Envío exprés:</span> 1 a 3 días hábiles.</li>
          <li><span className="font-medium">Envío internacional:</span> 7 a 20 días hábiles, dependiendo del país.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">3. Costos de envío</h2>
        <p className="text-gray-600">
          Los costos de envío se calculan automáticamente en el carrito de compras y se mostrarán
          antes de finalizar la compra. En ocasiones, podemos ofrecer promociones con envío gratuito.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">4. Seguimiento de pedidos</h2>
        <p className="text-gray-600">
          Una vez despachado tu pedido, recibirás un correo electrónico con el número de seguimiento
          y las instrucciones para rastrear tu paquete en línea.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">5. Retrasos y responsabilidades</h2>
        <p className="text-gray-600">
          No nos hacemos responsables por retrasos ocasionados por causas externas, como huelgas,
          desastres naturales o demoras en aduanas. Sin embargo, haremos lo posible para ayudarte
          a resolver cualquier inconveniente.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">6. Dirección de envío</h2>
        <p className="text-gray-600">
          Es responsabilidad del cliente proporcionar una dirección de envío correcta y completa.
          No nos hacemos responsables de pedidos enviados a direcciones incorrectas proporcionadas
          por el cliente.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">7. Contacto</h2>
        <p className="text-gray-600">
          Si tienes preguntas sobre esta política o tu envío, contáctanos en{" "}
          <a href="mailto:envios@tu-dominio.com" className="text-blue-600 hover:underline">
            envios@tu-dominio.com
          </a>.
        </p>
      </section>

      <p className="text-gray-600 mt-10">Última actualización: 19 de agosto de 2025</p>
    </div>
  );
}
