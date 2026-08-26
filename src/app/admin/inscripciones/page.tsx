"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { obtenerPreinscripciones, actualizarEstadoInscripcion, eliminarPreinscripcion } from '@/actions/preinscripciones';

export default function GestionInscripciones() {
  const [inscripciones, setInscripciones] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = async () => {
    setCargando(true);
    const datos = await obtenerPreinscripciones();
    setInscripciones(datos);
    setCargando(false);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const cambiarEstado = async (id: number, nuevoEstado: string) => {
    const res = await actualizarEstadoInscripcion(id, nuevoEstado);
    if (res.success) {
      cargarDatos(); // Recargamos la tabla para ver el nuevo color
    } else {
      alert("Error al cambiar el estado");
    }
  };

  const borrarSolicitud = async (id: number, nombre: string) => {
    if (!window.confirm(`¿Seguro que quieres eliminar la solicitud de ${nombre}?`)) return;
    
    const res = await eliminarPreinscripcion(id);
    if (res.success) {
      cargarDatos();
    } else {
      alert("Error al eliminar");
    }
  };

  // Función para dar color a las etiquetas de estado
  const colorEstado = (estado: string) => {
    switch (estado) {
      case 'PENDIENTE': return 'bg-rose-100 text-rose-700';
      case 'CONTACTADO': return 'bg-amber-100 text-amber-700';
      case 'MATRICULADO': return 'bg-emerald-100 text-emerald-700';
      case 'RECHAZADO': return 'bg-slate-200 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Solicitudes de Academia</h1>
          <p className="text-slate-500 mt-1">Gestiona los nuevos alumnos interesados en entrar a la banda.</p>
        </div>
        <Link href="/admin" className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors">
          Volver al Panel
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm uppercase">
                <th className="p-4 font-semibold">Alumno</th>
                <th className="p-4 font-semibold">Contacto</th>
                <th className="p-4 font-semibold">Preferencias</th>
                <th className="p-4 font-semibold">Estado</th>
                <th className="p-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cargando ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Cargando solicitudes...</td></tr>
              ) : inscripciones.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">No hay ninguna solicitud de inscripción todavía.</td></tr>
              ) : (
                inscripciones.map((insc) => (
                  <tr key={insc.id} className="hover:bg-slate-50/50 transition-colors">
                    
                    {/* Alumno */}
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{insc.nombre} {insc.apellidos}</div>
                      <div className="text-xs text-slate-500">
                        {insc.esMenor ? (
                          <span className="text-indigo-600 font-medium">Menor (Tutor: {insc.tutorNombre})</span>
                        ) : 'Mayor de edad'}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Nacimiento: {new Date(insc.fechaNacimiento).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Contacto */}
                    <td className="p-4 text-sm">
                      <div className="text-slate-800 font-medium">{insc.telefono}</div>
                      <div className="text-slate-500">{insc.email}</div>
                      {insc.esMenor && <div className="text-indigo-500 text-xs mt-1">Tel. Tutor: {insc.tutorTelefono}</div>}
                    </td>

                    {/* Preferencias */}
                    <td className="p-4 text-sm">
                      <div className="font-medium text-slate-800">{insc.instrumento || 'No especificado'}</div>
                      <div className="text-xs text-slate-500">Exp: {insc.experiencia}</div>
                      {insc.observaciones && (
                        <div className="text-xs text-slate-400 mt-1 truncate max-w-[150px]" title={insc.observaciones}>
                          Obs: {insc.observaciones}
                        </div>
                      )}
                    </td>

                    {/* Estado */}
                    <td className="p-4">
                      <select 
                        value={insc.estado} 
                        onChange={(e) => cambiarEstado(insc.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border-0 cursor-pointer focus:ring-2 focus:ring-slate-200 outline-none ${colorEstado(insc.estado)}`}
                      >
                        <option value="PENDIENTE" className="bg-white text-slate-800">PENDIENTE</option>
                        <option value="CONTACTADO" className="bg-white text-slate-800">CONTACTADO</option>
                        <option value="MATRICULADO" className="bg-white text-slate-800">MATRICULADO</option>
                        <option value="RECHAZADO" className="bg-white text-slate-800">RECHAZADO</option>
                      </select>
                    </td>

                    {/* Acciones */}
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => borrarSolicitud(insc.id, insc.nombre)} 
                        className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm transition-colors font-medium"
                      >
                        Eliminar
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