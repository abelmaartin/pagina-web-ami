"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { obtenerInfoCarpeta, actualizarEstadoRecibo, eliminarRecibo, duplicarColeccion } from '@/actions/recibos';

export default function InteriorCarpeta() {
  const params = useParams();
  const router = useRouter();
  const coleccionId = parseInt(params.id as string);

  const [carpeta, setCarpeta] = useState<any>(null);
  const [recibos, setRecibos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  const cargarDatos = async () => {
    setCargando(true);
    const data = await obtenerInfoCarpeta(coleccionId);
    setCarpeta(data.carpeta);
    setRecibos(data.recibos);
    setCargando(false);
  };

  useEffect(() => {
    cargarDatos();
  }, [coleccionId]);

  const cambiarEstado = async (id: number, nuevoEstado: string) => {
    const res = await actualizarEstadoRecibo(id, nuevoEstado, coleccionId);
    if (res.success) cargarDatos();
  };

  const borrarRecibo = async (id: number, dest: string) => {
    if (!window.confirm(`¿Borrar el recibo de ${dest}?`)) return;
    const res = await eliminarRecibo(id, coleccionId);
    if (res.success) cargarDatos();
  };

  const handleDuplicar = async () => {
    const nuevoNombre = prompt(`Vamos a copiar TODOS los recibos.\n1. Escribe el nombre de la NUEVA carpeta (Ej: Socios 2027):`);
    if (!nuevoNombre) return;
    
    const nuevoConcepto = prompt(`2. Escribe el nuevo concepto para los recibos copiados (Ej: Cuota 2027):`);
    if (!nuevoConcepto) return;

    setCargando(true);
    const res = await duplicarColeccion(coleccionId, nuevoNombre, nuevoConcepto);
    if (res.success) {
      alert("¡Carpeta clonada con éxito! Vuelve al menú principal para verla.");
      router.push('/admin/recibos');
    } else {
      alert("Error al clonar");
      setCargando(false);
    }
  };

  if (cargando) return <div className="p-12 text-center">Cargando carpeta...</div>;
  if (!carpeta) return <div className="p-12 text-center text-red-500">Carpeta no encontrada</div>;

  const colorEstado = (est: string) => {
    if (est === 'PAGADO') return 'bg-emerald-100 text-emerald-700';
    if (est === 'ANULADO') return 'bg-slate-200 text-slate-700';
    return 'bg-rose-100 text-rose-700';
  };

  const filtrados = recibos.filter(r => 
    r.destinatario.toLowerCase().includes(busqueda.toLowerCase()) ||
    (r.musicoResponsable && r.musicoResponsable.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <Link href="/admin/recibos" className="text-indigo-600 hover:underline text-sm font-medium mb-2 inline-block">&larr; Volver a Carpetas</Link>
          <h1 className="text-3xl font-bold text-slate-800">📂 {carpeta.nombre}</h1>
        </div>
        <div className="flex gap-3">
          {recibos.length > 0 && (
            <button onClick={handleDuplicar} className="px-4 py-2 bg-amber-100 text-amber-800 font-bold rounded-xl hover:bg-amber-200">
              ⟳ Duplicar para nuevo año
            </button>
          )}
          <Link href={`/admin/recibos/${coleccionId}/nuevo`} className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 shadow-sm">
            + Añadir Recibo
          </Link>
        </div>
      </div>

      <input type="text" placeholder="🔍 Buscar por destinatario o músico responsable..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
        className="w-full p-4 mb-6 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none" />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm">
              <th className="p-4">DESTINATARIO / MÚSICO</th>
              <th className="p-4">CONCEPTO</th>
              <th className="p-4 text-right">IMPORTE</th>
              <th className="p-4 text-center">ESTADO</th>
              <th className="p-4 text-right">ACCIONES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtrados.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="p-4">
                  <div className="font-bold text-slate-800">{r.destinatario}</div>
                  {r.musicoResponsable && <div className="text-xs text-indigo-500 mt-1">Responsable: {r.musicoResponsable}</div>}
                </td>
                <td className="p-4">
                  <div className="font-medium text-slate-700">{r.concepto}</div>
                  <div className="text-xs text-slate-400">{r.tipo}</div>
                </td>
                <td className="p-4 text-right font-bold text-slate-800">{r.importe.toFixed(2)} €</td>
                <td className="p-4 text-center">
                  <select value={r.estado} onChange={(e) => cambiarEstado(r.id, e.target.value)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border-0 cursor-pointer focus:ring-2 outline-none ${colorEstado(r.estado)}`}>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="PAGADO">PAGADO</option>
                    <option value="ANULADO">ANULADO</option>
                  </select>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => borrarRecibo(r.id, r.destinatario)} className="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-medium">Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}