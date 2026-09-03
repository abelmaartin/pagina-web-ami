"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { crearRecibo } from '@/actions/recibos';

export default function NuevoRecibo() {
  const router = useRouter();
  const params = useParams();
  const coleccionId = params.id as string;
  const [cargando, setCargando] = useState(false);
  
  const [formData, setFormData] = useState({
    destinatario: '', concepto: '', tipo: 'SOCIO', importe: '',
    estado: 'PENDIENTE', musicoResponsable: '', notas: '', coleccionId: coleccionId
  });

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    const res = await crearRecibo(formData);
    if (res.success) router.push(`/admin/recibos/${coleccionId}`);
    else { alert("Error al guardar"); setCargando(false); }
  };

  return (
    <div className="p-6 md:p-12 max-w-3xl mx-auto">
      <Link href={`/admin/recibos/${coleccionId}`} className="text-indigo-600 hover:underline text-sm font-medium mb-6 inline-block">&larr; Volver a la carpeta</Link>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Añadir Recibo</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl">
          <div>
            <label className="block text-sm font-medium mb-2">Destinatario / Pagador *</label>
            <input type="text" name="destinatario" required value={formData.destinatario} onChange={handleChange} className="w-full p-3 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Músico Responsable (Opcional)</label>
            <input type="text" name="musicoResponsable" value={formData.musicoResponsable} onChange={handleChange} className="w-full p-3 border rounded-xl" placeholder="¿Quién trajo a este socio?" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Concepto *</label>
            <input type="text" name="concepto" required value={formData.concepto} onChange={handleChange} className="w-full p-3 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Importe (€) *</label>
            <input type="number" step="0.01" name="importe" required value={formData.importe} onChange={handleChange} className="w-full p-3 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tipo</label>
            <select name="tipo" value={formData.tipo} onChange={handleChange} className="w-full p-3 border rounded-xl bg-white">
              <option value="SOCIO">Socio</option>
              <option value="LOTERIA">Lotería</option>
              <option value="ACADEMIA">Academia</option>
              <option value="OTRO">Otro</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Estado Inicial</label>
            <select name="estado" value={formData.estado} onChange={handleChange} className="w-full p-3 border rounded-xl bg-white">
              <option value="PENDIENTE">PENDIENTE</option>
              <option value="PAGADO">PAGADO</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={cargando} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl mt-4">
          {cargando ? 'Guardando...' : 'Guardar en Carpeta'}
        </button>
      </form>
    </div>
  );
}