"use client";

import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      {/* Header con botón de regresar */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Política de Privacidad</h1>
        <Link
          href="/"
          className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
        >
          <IoArrowBack className="h-4 w-4" />
          Regresar
        </Link>
      </div>

      <p className="text-gray-600">
        En esta Política de Privacidad explicamos cómo recopilamos, usamos y protegemos tu
        información personal cuando utilizas nuestra aplicación y servicios.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">1. Información que recopilamos</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-1">
          <li><span className="font-medium">Datos que nos proporcionas:</span> nombre, correo electrónico, contraseña, perfil y cualquier información que envíes mediante formularios.</li>
          <li><span className="font-medium">Datos de uso:</span> páginas visitadas, acciones realizadas, identificadores de dispositivo, dirección IP, tipo de navegador, sistema operativo.</li>
          <li><span className="font-medium">Cookies y tecnologías similares:</span> para recordar preferencias, mantener sesiones y medir rendimiento.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">2. Cómo utilizamos tu información</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-1">
          <li>Proveer y mantener el servicio (incluida la autenticación y la seguridad).</li>
          <li>Mejorar la experiencia de usuario y desarrollar nuevas funcionalidades.</li>
          <li>Procesar pagos (si aplica) y enviar notificaciones relacionadas con el servicio.</li>
          <li>Cumplir obligaciones legales y responder a requerimientos de autoridades competentes.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">3. Base legal del tratamiento</h2>
        <p className="text-gray-600">
          Tratamos tus datos sobre la base de la ejecución del contrato (proveer el servicio),
          el consentimiento (por ejemplo, para comunicaciones comerciales) y el interés legítimo
          (mejorar y proteger el servicio), según corresponda.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">4. Compartición de datos</h2>
        <p className="text-gray-600">
          Podemos compartir datos con proveedores que nos ayudan a operar el servicio (por ejemplo,
          alojamiento, analítica, pasarelas de pago), bajo contratos que exigen confidencialidad
          y seguridad. No vendemos tu información personal.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">5. Cookies</h2>
        <p className="text-gray-600">
          Usamos cookies esenciales para el funcionamiento del sitio y cookies opcionales (analítica/medición).
          Puedes gestionar tus preferencias desde la configuración de tu navegador o a través de nuestro
          banner de cookies (si está disponible).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">6. Retención</h2>
        <p className="text-gray-600">
          Conservamos tus datos sólo durante el tiempo necesario para los fines descritos en esta
          política o según lo exija la ley aplicable. Posteriormente, los eliminamos o anonimizamos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">7. Seguridad</h2>
        <p className="text-gray-600">
          Aplicamos medidas técnicas y organizativas razonables para proteger tu información.
          Sin embargo, ningún sistema es 100% seguro; te recomendamos usar contraseñas fuertes
          y mantener tus credenciales en privado.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">8. Tus derechos</h2>
        <p className="text-gray-600">
          Según tu jurisdicción, puedes tener derechos de acceso, rectificación, eliminación,
          portabilidad y oposición/restricción del tratamiento. Para ejercerlos, contáctanos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">9. Transferencias internacionales</h2>
        <p className="text-gray-600">
          Si transferimos datos fuera de tu país, implementamos salvaguardas adecuadas (por ejemplo,
          cláusulas contractuales estándar) para proteger tu información.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">10. Cambios a esta política</h2>
        <p className="text-gray-600">
          Podemos actualizar esta política ocasionalmente. Publicaremos la versión vigente en esta
          página y, si los cambios son significativos, te notificaremos por medios razonables.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">11. Contacto</h2>
        <p className="text-gray-600">
          Si tienes preguntas o solicitudes sobre privacidad, escríbenos a{" "}
          <a href="mailto:privacidad@tu-dominio.com" className="text-blue-600 hover:underline">
            privacidad@tu-dominio.com
          </a>.
        </p>
      </section>

      <p className="text-gray-600 mt-10">Última actualización: 19 de agosto de 2025</p>
    </div>
  );
}
