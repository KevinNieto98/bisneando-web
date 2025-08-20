'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaArrowLeft, FaHome, FaBuilding } from 'react-icons/fa';
import { IoPersonCircleOutline } from 'react-icons/io5';

export default function EditProfilePage() {
  const [verified, setVerified] = useState(true); // cambia a false si no está verificada
  const [hasPhoto, setHasPhoto] = useState(false); // cambia a true si hay foto subida

  return (
    <div className="flex justify-center items-center py-12 px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white shadow-sm p-8">
        {/* Botón volver */}
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-yellow-600 hover:text-yellow-700 transition"
          >
            <FaArrowLeft className="h-4 w-4" />
            Volver
          </Link>
        </div>

        {/* Foto y estado de verificación */}
        <div className="flex flex-col items-center mb-8">
          {hasPhoto ? (
            <div className="relative h-28 w-28 rounded-full overflow-hidden ring-2 ring-yellow-400">
              <Image
                src="/profile-placeholder.png"
                alt="Foto de perfil"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-zinc-100 ring-2 ring-yellow-400">
              <IoPersonCircleOutline className="h-20 w-20 text-blue-900" />
            </div>
          )}

          <button className="mt-4 px-4 py-2 text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 rounded-full transition">
            Cambiar foto
          </button>

          <div className="mt-3">
            {verified ? (
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-green-100 text-green-700 border border-green-300">
                <FaCheckCircle className="text-green-600" />
                <span className="font-medium">Cuenta verificada</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-orange-100 text-orange-700 border border-orange-300">
                <FaTimesCircle className="text-orange-500" />
                <span className="font-medium">Cuenta no verificada</span>
              </div>
            )}
          </div>
        </div>

        {/* Formulario de perfil */}
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700">Nombre</label>
            <input type="text" className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-200 outline-none" placeholder="Tu nombre" />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">Apellido</label>
            <input type="text" className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-200 outline-none" placeholder="Tu apellido" />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">Correo electrónico</label>
            <input type="email" className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-200 outline-none" placeholder="ejemplo@correo.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">Sexo</label>
            <select className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-200 outline-none">
              <option value="">Selecciona</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">Teléfono</label>
            <input type="tel" className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-200 outline-none" placeholder="+504 9999-9999" />
          </div>
        </form>

        {/* Mis Direcciones */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-zinc-800">Mis Direcciones</h2>
            <Link
              href="/address"
              className="px-4 py-2 rounded-full bg-yellow-500 text-white text-sm font-medium hover:bg-yellow-600 transition"
            >
              Editar direcciones
            </Link>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 bg-zinc-50">
              <div className="flex items-center gap-3">
                <FaHome className="text-yellow-500 w-6 h-6" />
                <div>
                  <p className="font-medium text-zinc-800">Casa</p>
                  <p className="text-sm text-zinc-600">Colonia Kennedy, Tegucigalpa</p>
                </div>
              </div>
              <button className="text-sm text-yellow-600 hover:text-yellow-700 font-medium">Editar</button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 bg-zinc-50">
              <div className="flex items-center gap-3">
                <FaBuilding className="text-yellow-500 w-6 h-6" />
                <div>
                  <p className="font-medium text-zinc-800">Oficina</p>
                  <p className="text-sm text-zinc-600">Boulevard Suyapa, Tegucigalpa</p>
                </div>
              </div>
              <button className="text-sm text-yellow-600 hover:text-yellow-700 font-medium">Editar</button>
            </div>
          </div>
        </div>

        {/* Botones finales */}
        <div className="pt-6 mt-8 space-y-4">
          <button
            type="submit"
            className="w-full rounded-full bg-yellow-500 py-2 font-semibold text-white hover:bg-yellow-600 transition"
          >
            Guardar cambios
          </button>

          {/* Botón Cambiar contraseña */}
          <Link
            href="/account/change-password"
            className="block w-full text-center rounded-full border border-yellow-500 py-2 font-semibold text-yellow-600 hover:bg-yellow-50 transition"
          >
            Cambiar contraseña
          </Link>
        </div>
      </div>
    </div>
  );
}
