"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { obtenerRecibos, actualizarEstadoRecibo, eliminarRecibo, renovarColeccion } from '@/actions/recibos';

export default function GestionRecibos() {
  const [recibos, setRecibos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState(''); // Estado para el buscador

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

  const handleRenovarColeccion = async () => {
    const colAntigua = prompt("1. Introduce el nombre EXACTO de la colección a copiar (Ej: Socios 2026):");
    if (!colAntigua) return;
    
    const colNueva = prompt("2. Introduce el nombre de la NUEVA colección (Ej: Socios 2027):");
    if (!colNueva) return;
    
    const conceptoNuevo = prompt("3. Introduce el concepto para los nuevos recibos (Ej: Cuota Socio 2027):");
    if (!conceptoNuevo) return;

    if (window.confirm(`Se van a duplicar todos los recibos de "${colAntigua}" para crear la colección "${colNueva}". ¿Continuar?`)) {
      setCargando(true);
      const res = await renovarColeccion(colAntigua, colNueva, conceptoNuevo);
      if (res.success) {
        alert(`¡Éxito! Se han generado ${res.cantidad} recibos nuevos en estado PENDIENTE.`);
        cargarDatos();
      } else {
        alert(res.error || "Hubo un error al renovar");
        setCargando(false);
      }
    }
  };

  const colorEstado = (estado: string) => {
    switch (estado) {
      case 'PENDIENTE': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'PAGADO': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'ANULADO': return 'bg-slate-200 text-slate-700 border-slate-300';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  // Filtrado en tiempo real
  const recibosFiltrados = recibos.filter(r => 
    r.destinatario.toLowerCase().includes(busqueda.toLowerCase()) ||
    r.concepto.toLowerCase().includes(busqueda.toLowerCase()) ||
    (r.musicoResponsable && r.musicoResponsable.toLowerCase().includes(busqueda.toLowerCase())) ||
    (r.coleccion && r.coleccion.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Gestión de Recibos</h1>
          <p className="text-slate-500 mt-1">Control de pagos, lotería, cuotas de socios y academia.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin" className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors">
            Volver
          </Link>
          <button onClick={handleRenovarColeccion} className="px-4 py-2 bg-emerald-100 text-emerald-700 font-medium rounded-xl hover:bg-emerald-200 transition-colors shadow-sm">
            ⟳ Renovar Colección
          </button>
          <Link href="/admin/recibos/nuevo" className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
            + Nuevo Recibo
          </Link>
        </div>
      </div>

      {/* Buscador */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Buscar por socio, concepto, colección, músico responsable..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm uppercase">
                <th className="p-4 font-semibold">Fecha / Colección</th>
                <th className="p-4 font-semibold">Destinatario / Músico</th>
                <th className="p-4 font-semibold">Concepto</th>
                <th className="p-4 font-semibold text-right">Importe</th>
                <th className="p-4 font-semibold text-center">Estado</th>
                <th className="p-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cargando ? (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">Cargando recibos...</td></tr>
              ) : recibosFiltrados.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">No se encontraron recibos.</td></tr>
              ) : (
                recibosFiltrados.map((recibo) => (
                  <tr key={recibo.id} className="hover:bg-slate-50/50 transition-colors">
                    
                    {/* Fecha y Colección */}
                    <td className="p-4">
                      <div className="text-sm text-slate-500 mb-1">
                        {new Date(recibo.fechaEmision).toLocaleDateString('es-ES')}
                      </div>
                      {recibo.coleccion ? (
                        <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md">{recibo.coleccion}</span>
                      ) : (
                        <span className="text-xs text-slate-300">- Sin colección -</span>
                      )}
                    </td>

                    {/* Destinatario y Músico */}
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{recibo.destinatario}</div>
                      {recibo.musicoResponsable && (
                        <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                          Responsable: {recibo.musicoResponsable}
                        </div>
                      )}
                    </td>

                    {/* Concepto y Tipo */}
                    <td className="p-4">
                      <div className="font-medium text-slate-800">{recibo.concepto}</div>
                      <div className="text-xs font-semibold text-slate-400 uppercase mt-1">{recibo.tipo}</div>
                    </td>

                    {/* Importe */}
                    <td className="p-4 text-right">
                      <div className="text-lg font-bold text-slate-800">{recibo.importe.toFixed(2)} €</div>
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
                        className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs transition-colors font-medium"
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