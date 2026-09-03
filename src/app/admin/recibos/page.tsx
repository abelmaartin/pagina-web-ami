"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { obtenerRecibos, actualizarEstadoRecibo, eliminarRecibo } from '@/actions/recibos';

export default function GestionRecibos() {
  const [recibos, setRecibos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = async () => {
    setCargando(true);
    const datos = await obtenerRecibos();
    setRecibos(datos);
    setCargando(false);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const cambiarEstado = async (id: number, nuevoEstado: string) => {
    const res = await actualizarEstadoRecibo(id, nuevoEstado);
    if (res.success) cargarDatos();
  };

  const borrarRecibo = async (id: number, concepto: string) => {
    if (!window.confirm(`¿Seguro que quieres borrar el recibo "${concepto}"?`)) return;
    const res = await eliminarRecibo(id);
    if (res.success) cargarDatos();
  };

  const colorEstado = (estado: string) => {
    switch (estado) {
      case 'PENDIENTE': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'PAGADO': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'ANULADO': return 'bg-slate-200 text-slate-700 border-slate-300';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Gestión de Recibos</h1>
          <p className="text-slate-500 mt-1">Control de pagos, lotería, cuotas de socios y academia.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin" className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors">
            Volver
          </Link>
          <Link href="/admin/recibos/nuevo" className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
            + Nuevo Recibo
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm uppercase">
                <th className="p-4 font-semibold">Fecha / Destinatario</th>
                <th className="p-4 font-semibold">Concepto / Tipo</th>
                <th className="p-4 font-semibold text-right">Importe</th>
                <th className="p-4 font-semibold text-center">Estado</th>
                <th className="p-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cargando ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Cargando recibos...</td></tr>
              ) : recibos.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Aún no hay ningún recibo registrado.</td></tr>
              ) : (
                recibos.map((recibo) => (
                  <tr key={recibo.id} className="hover:bg-slate-50/50 transition-colors">
                    
                    {/* Destinatario y Fecha */}
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{recibo.destinatario}</div>
                      <div className="text-xs text-slate-500">
                        {new Date(recibo.fechaEmision).toLocaleDateString('es-ES')}
                      </div>
                    </td>

                    {/* Concepto y Tipo */}
                    <td className="p-4">
                      <div className="font-medium text-slate-800">{recibo.concepto}</div>
                      <div className="text-xs font-semibold text-indigo-500 uppercase">{recibo.tipo}</div>
                      {recibo.notas && <div className="text-xs text-slate-400 mt-1 truncate max-w-xs">{recibo.notas}</div>}
                    </td>

                    {/* Importe */}
                    <td className="p-4 text-right">
                      <div className="text-xl font-bold text-slate-800">{recibo.importe.toFixed(2)} €</div>
                    </td>

                    {/* Estado */}
                    <td className="p-4 text-center">
                      <select 
                        value={recibo.estado} 
                        onChange={(e) => cambiarEstado(recibo.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer focus:ring-2 outline-none ${colorEstado(recibo.estado)}`}
                      >
                        <option value="PENDIENTE" className="bg-white text-slate-800">PENDIENTE</option>
                        <option value="PAGADO" className="bg-white text-slate-800">PAGADO</option>
                        <option value="ANULADO" className="bg-white text-slate-800">ANULADO</option>
                      </select>
                    </td>

                    {/* Acciones */}
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => borrarRecibo(recibo.id, recibo.concepto)} 
                        className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm transition-colors font-medium"
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}