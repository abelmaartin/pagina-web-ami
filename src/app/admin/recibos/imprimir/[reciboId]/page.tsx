"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { obtenerReciboPorId } from '@/actions/recibos';

export default function ImprimirRecibo() {
  const params = useParams();
  const router = useRouter();
  const reciboId = parseInt(params.reciboId as string);
  
  const [recibo, setRecibo] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarRecibo = async () => {
      const data = await obtenerReciboPorId(reciboId);
      setRecibo(data);
      setCargando(false);
    };
    cargarRecibo();
  }, [reciboId]);

  if (cargando) return <div className="p-12 text-center">Cargando plantilla del recibo...</div>;
  if (!recibo) return <div className="p-12 text-center text-red-500">No se encontró el recibo.</div>;

  return (
    <>
      <style>{`
        @media print {
          /* Ocultamos visualmente todo */
          body * {
            visibility: hidden;
          }
          /* Hacemos visible solo el recibo */
          #zona-impresion, #zona-impresion * {
            visibility: visible;
          }
          /* Lo colocamos en la esquina superior izquierda */
          #zona-impresion {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          
          /* --- SOLUCIÓN A LAS PÁGINAS EN BLANCO --- */
          /* Esto elimina todo el espacio "fantasma" de los elementos invisibles */
          html, body {
            overflow: hidden !important; 
            height: 100% !important;
            min-height: 0 !important;
            margin: 0;
            padding: 0;
          }
          /* Anulamos la altura mínima de la pantalla principal de Tailwind */
          .min-h-screen {
            min-height: 0 !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-slate-100 p-8 print:bg-white print:p-0">
        
        {/* Botones de acción */}
        <div className="max-w-2xl mx-auto mb-8 flex justify-between items-center print:hidden">
          <button onClick={() => router.back()} className="text-slate-600 hover:text-slate-900 font-medium">
            &larr; Volver
          </button>
          <button 
            onClick={() => window.print()} 
            className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir / Guardar como PDF
          </button>
        </div>

        {/* PLANTILLA DEL RECIBO */}
        <div 
          id="zona-impresion" 
          className="max-w-2xl mx-auto bg-white p-10 border-2 border-slate-300 rounded-xl shadow-lg print:shadow-none print:border-none print:p-0"
        >
          
          {/* Cabecera */}
          <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-8">
            <div>
              <h1 className="text-2xl font-black uppercase text-slate-800">Agrupación Musical Isorana</h1>
              <p className="text-sm font-medium text-slate-500 mt-1">CIF: G38047940</p>
              <p className="text-sm text-slate-500">agrupacionmusicalisorana@gmail.com</p>
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-black text-indigo-600 tracking-wider print:text-black">RECIBO</h2>
              <p className="text-lg font-mono text-slate-600 mt-1">Nº {recibo.id.toString().padStart(6, '0')}</p>
            </div>
          </div>

          {/* Cuerpo del recibo */}
          <div className="space-y-6 text-slate-800">
            <div className="flex items-center text-lg">
              <span className="font-bold w-32 shrink-0">Fecha:</span>
              <span className="border-b border-slate-300 flex-grow pb-1">{new Date(recibo.fechaEmision).toLocaleDateString('es-ES')}</span>
            </div>

            <div className="flex items-center text-lg">
              <span className="font-bold w-32 shrink-0">Recibí de:</span>
              <span className="border-b border-slate-300 flex-grow pb-1 font-medium">{recibo.destinatario}</span>
            </div>

            <div className="flex items-center text-lg">
              <span className="font-bold w-32 shrink-0">La cantidad de:</span>
              <span className="border-b border-slate-300 flex-grow pb-1 font-bold text-xl">{recibo.importe.toFixed(2)} €</span>
            </div>

            <div className="flex items-end text-lg">
              <span className="font-bold w-32 shrink-0">En concepto de:</span>
              <span className="border-b border-slate-300 flex-grow pb-1 leading-relaxed">
                {recibo.concepto}
              </span>
            </div>
          </div>

          {/* Pie y Firmas */}
          <div className="mt-16 flex justify-between items-end">
            <div className="text-center w-48">
              <div className="border-t border-slate-800 pt-2 font-bold text-sm uppercase">Firma del Pagador</div>
            </div>
            
            <div className="text-center w-48 relative">
              {/* Sello PAGADO */}
              {recibo.estado === 'PAGADO' && (
                <div className="absolute -top-12 left-4 border-4 border-emerald-600 text-emerald-600 font-black text-xl px-4 py-1 rounded-lg transform -rotate-12 opacity-80 print:border-black print:text-black">
                  PAGADO
                </div>
              )}
              <div className="border-t border-slate-800 pt-2 font-bold text-sm uppercase">Agrupación Musical</div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}