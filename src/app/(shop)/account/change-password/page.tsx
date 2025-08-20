'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { FaArrowLeft, FaKey } from 'react-icons/fa';
import { IoPersonCircleOutline } from 'react-icons/io5';

export default function ChangePasswordPage() {
  const router = useRouter();
  const [hasPhoto, setHasPhoto] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // evita el refresh y asegura que corra en cliente
    // Aquí podrías validar que ambas contraseñas coincidan, llamar a tu API, etc.
    router.push('/account'); // redirige después de "guardar"
  };

  return (
    <div className="flex justify-center items-center py-12 px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white shadow-sm p-8">
        {/* Botón volver */}
        <div className="mb-6">
          <Link
            href="/account/edit-profile"
            className="inline-flex items-center gap-2 text-sm font-medium text-yellow-600 hover:text-yellow-700 transition"
          >
            <FaArrowLeft className="h-4 w-4" />
            Volver
          </Link>
        </div>

        {/* Foto de perfil */}
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
        </div>

        {/* Formulario cambiar contraseña */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Nombre solo lectura */}
          <div>
            <label className="block text-sm font-medium text-zinc-700">Nombre</label>
            <p className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-2 text-sm text-zinc-700">
              Juan Pérez
            </p>
          </div>

          {/* Nueva contraseña */}
          <div>
            <label className="block text-sm font-medium text-zinc-700">Nueva contraseña</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <FaKey className="h-4 w-4" />
              </span>
              <input
                type="password"
                className="w-full rounded-xl border border-zinc-300 pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-yellow-200 outline-none"
                placeholder="Escribe tu nueva contraseña"
                required
              />
            </div>
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label className="block text-sm font-medium text-zinc-700">Confirmar contraseña</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <FaKey className="h-4 w-4" />
              </span>
              <input
                type="password"
                className="w-full rounded-xl border border-zinc-300 pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-yellow-200 outline-none"
                placeholder="Repite tu nueva contraseña"
                required
              />
            </div>
          </div>

          {/* Botón Guardar cambios (dentro del form) */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full rounded-full bg-yellow-500 py-2 font-semibold text-white hover:bg-yellow-600 transition"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
