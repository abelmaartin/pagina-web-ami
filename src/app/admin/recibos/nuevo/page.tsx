"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { crearRecibo } from '@/actions/recibos';

export default function NuevoRecibo() {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);
  
  const [formData, setFormData] = useState({
    destinatario: '',
    concepto: '',
    tipo: 'SOCIO',
    importe: '',
    estado: 'PENDIENTE',
    musicoResponsable: '',
    coleccion: '',
    notas: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    
    const res = await crearRecibo(formData);
    
    if (res.success) {
      router.push('/admin/recibos');
    } else {
      alert("Hubo un error al guardar el recibo");
      setCargando(false);
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/recibos" className="text-indigo-600 hover:underline text-sm font-medium mb-4 inline-block">
          &larr; Volver a Recibos
        </Link>
        <h1 className="text-3xl font-bold text-slate-800">Emitir Nuevo Recibo</h1>
        <p className="text-slate-500 mt-1">Registra un nuevo cobro asociándolo a una colección si es necesario.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        
        {/* Fila 1: Destinatario y Músico */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-xl">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">A nombre de (Destinatario) *</label>
            <input type="text" name="destinatario" required value={formData.destinatario} onChange={handleChange}
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" 
              placeholder="Ej: Manuel García" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Músico Responsable (Opcional)</label>
            <input type="text" name="musicoResponsable" value={formData.musicoResponsable} onChange={handleChange}
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" 
              placeholder="¿Qué músico le entregó la lotería/socio?" />
          </div>
        </div>

        {/* Fila 2: Concepto e Importe */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Concepto *</label>
            <input type="text" name="concepto" required value={formData.concepto} onChange={handleChange}
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              placeholder="Ej: Cuota Socio 2026" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Importe (€) *</label>
            <input type="number" step="0.01" min="0" name="importe" required value={formData.importe} onChange={handleChange}
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              placeholder="Ej: 20.00" />
          </div>
        </div>

        {/* Fila 3: Organización (Tipo y Colección) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Recibo *</label>
            <select name="tipo" value={formData.tipo} onChange={handleChange}
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="SOCIO">Cuota de Socio</option>
              <option value="LOTERIA">Lotería / Sorteos</option>
              <option value="ACADEMIA">Cuota Academia</option>
              <option value="MATERIAL">Instrumentos / Uniforme</option>
              <option value="ACTUACION">Cobro Actuación</option>
              <option value="OTRO">Otro</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Colección / Lote (Opcional)</label>
            <input type="text" name="coleccion" value={formData.coleccion} onChange={handleChange}
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              placeholder="Ej: Socios 2026 (Sirve para agruparlos y renovarlos juntos)" />
          </div>
        </div>

        {/* Fila 4: Notas y Estado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-100 pt-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Notas internas (Opcional)</label>
            <textarea name="notas" rows={2} value={formData.notas} onChange={handleChange}
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Ej: Pagado por transferencia."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Estado de Pago Inicial *</label>
            <select name="estado" value={formData.estado} onChange={handleChange}
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="PENDIENTE">Pendiente de Cobro</option>
              <option value="PAGADO">Ya Pagado</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={cargando}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md disabled:opacity-70 mt-6"
        >
          {cargando ? 'Guardando...' : 'Guardar Recibo'}
        </button>
      </form>
    </div>
  );
}