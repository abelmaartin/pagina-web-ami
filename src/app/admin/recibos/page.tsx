"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { obtenerColecciones, crearColeccion, borrarColeccion } from '@/actions/recibos';

export default function CarpetasRecibos() {
  const [colecciones, setColecciones] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = async () => {
    setCargando(true);
    const datos = await obtenerColecciones();
    setColecciones(datos);
    setCargando(false);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleCrearCarpeta = async () => {
    const nombre = prompt("Introduce el título de la nueva carpeta (Ej: Socios 2026):");
    if (!nombre) return;
    
    const res = await crearColeccion(nombre);
    if (res.success) {
      cargarDatos();
    } else {
      alert("Error al crear la carpeta. Quizás el nombre ya existe.");
    }
  };

  const handleBorrarCarpeta = async (e: React.MouseEvent, id: number, nombre: string) => {
    e.preventDefault(); // Evita que al pulsar borrar se abra la carpeta
    if (window.confirm(`⚠️ PELIGRO: ¿Borrar la carpeta "${nombre}" y TODOS los recibos que hay dentro?`)) {
      await borrarColeccion(id);
      cargarDatos();
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Carpetas de Recibos</h1>
          <p className="text-slate-500 mt-1">Selecciona un lote para gestionar sus cobros.</p>
        </div>
        <Link href="/admin" className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200">
          Volver
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {/* Botón Nueva Carpeta */}
        <button 
          onClick={handleCrearCarpeta}
          className="aspect-square rounded-3xl border-2 border-dashed border-indigo-300 bg-indigo-50/30 hover:bg-indigo-50 flex flex-col items-center justify-center transition-all group"
        >
          <div className="w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </div>
          <span className="font-bold text-indigo-700">Nueva Carpeta</span>
        </button>

        {/* Lista de Carpetas */}
        {!cargando && colecciones.map((col) => (
          <Link href={`/admin/recibos/${col.id}`} key={col.id} className="relative aspect-square bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300 flex flex-col items-center justify-center transition-all group p-4 text-center">
            
            <button onClick={(e) => handleBorrarCarpeta(e, col.id, col.nombre)} className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>

            <svg className="w-20 h-20 text-amber-300 mb-4 group-hover:scale-105 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            <h3 className="text-xl font-bold text-slate-800 line-clamp-2 px-2">{col.nombre}</h3>
            <p className="text-sm font-medium text-slate-400 mt-2">{col._count.recibos} recibos</p>
          </Link>
        ))}

      </div>
    </div>
  );
}