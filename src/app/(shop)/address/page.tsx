'use client';
import { useState } from 'react';
import { FaHome, FaBuilding, FaMapMarkerAlt, FaEdit, FaPhone } from 'react-icons/fa';

export default function DireccionesPage() {
  const [direcciones, setDirecciones] = useState([
    {
      id: 1,
      tipo: 'Casa',
      colonia: 'Colonia Kennedy, Tegucigalpa',
      referencia: 'Frente a la pulpería San Juan',
      telefono: '504 9999-8888',
      default: true,
    },
  ]);

  const [form, setForm] = useState({
    tipo: '',
    colonia: '',
    referencia: '',
    telefono: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.tipo || !form.colonia || !form.telefono) return;
    setDirecciones((prev) => [
      ...prev,
      { id: Date.now(), ...form, default: false },
    ]);
    setForm({ tipo: '', colonia: '', referencia: '', telefono: '' });
  };

  const setDefault = (id: number) => {
    setDirecciones((prev) => prev.map((d) => ({ ...d, default: d.id === id })));
  };

  const iconFor = (tipo: string) => {
    if (tipo === 'Casa') return <FaHome className="text-yellow-500" />;
    if (tipo === 'Oficina') return <FaBuilding className="text-yellow-500" />;
    return <FaMapMarkerAlt className="text-yellow-500" />;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mis Direcciones</h1>

      {/* Direcciones existentes */}
      <div className="space-y-4 mb-8">
        {direcciones.map((dir) => (
          <div
            key={dir.id}
            className={`rounded-2xl border bg-white p-5 shadow-md hover:shadow-lg transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
              dir.default ? 'border-yellow-400' : 'border-zinc-200'
            }`}
          >
            {/* Izquierda: Ícono único + textos */}
            <div className="flex items-start gap-4 flex-1">
              <div className="text-3xl leading-none mt-1">
                {iconFor(dir.tipo)}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
                  {dir.tipo}
                  {dir.default && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">
                      Predeterminada
                    </span>
                  )}
                </h2>
                <p className="text-sm text-zinc-600">{dir.colonia}</p>
                {dir.referencia && (
                  <p className="text-sm text-zinc-500 italic">{dir.referencia}</p>
                )}
                <p className="text-sm text-zinc-600 flex items-center gap-1">
                  <FaPhone className="text-yellow-500" /> {dir.telefono}
                </p>
              </div>
            </div>

            {/* Derecha: selector predeterminado + editar */}
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="defaultAddress"
                  checked={dir.default}
                  onChange={() => setDefault(dir.id)}
                  className="h-4 w-4 accent-yellow-500"
                />
                <span className="font-medium text-zinc-700">
                  {dir.default ? 'Predeterminada' : 'Hacer predeterminada'}
                </span>
              </label>

              <button
                className="inline-flex items-center gap-1 text-sm font-semibold text-yellow-600 hover:text-yellow-700 border border-yellow-300 rounded-lg px-3 py-1 hover:bg-yellow-50 transition"
                onClick={() => alert('Editar dirección (demo)')}
              >
                <FaEdit /> Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario para nueva dirección */}
      <div className="bg-white border rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Agregar nueva dirección</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium">Tipo de Dirección</label>
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 mt-1"
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="Casa">Casa</option>
              <option value="Oficina">Oficina</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Colonia</label>
            <select
              name="colonia"
              value={form.colonia}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 mt-1"
              required
            >
              <option value="">Selecciona una colonia</option>
              <option value="Colonia Kennedy">Colonia Kennedy</option>
              <option value="Colonia Palmira">Colonia Palmira</option>
              <option value="Colonia El Pedregal">Colonia El Pedregal</option>
              <option value="Colonia 21 de Octubre">Colonia 21 de Octubre</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium">Referencia</label>
            <textarea
              name="referencia"
              value={form.referencia}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-xl px-3 py-2 mt-1 resize-none"
              placeholder="Ej: Frente a la farmacia, portón verde, casa #123..."
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium">Teléfono de quien recibe</label>
            <input
              type="text"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 mt-1"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-2.5 px-4 rounded-2xl hover:from-yellow-500 hover:to-yellow-700 transition"
            >
              Guardar Dirección
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
