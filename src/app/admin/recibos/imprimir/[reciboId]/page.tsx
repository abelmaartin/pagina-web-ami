"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { obtenerReciboPorId } from '@/actions/recibos';

// --- FUNCIÓN PARA CONVERTIR NÚMEROS A LETRAS (EUROS Y CÉNTIMOS) ---
const NumeroALetras = (num: number) => {
  const Unidades = (n: number) => {
    switch (n) {
      case 1: return 'UN'; case 2: return 'DOS'; case 3: return 'TRES';
      case 4: return 'CUATRO'; case 5: return 'CINCO'; case 6: return 'SEIS';
      case 7: return 'SIETE'; case 8: return 'OCHO'; case 9: return 'NUEVE';
      default: return '';
    }
  };
  const Decenas = (n: number) => {
    const decena = Math.floor(n / 10);
    const unidad = n - (decena * 10);
    switch (decena) {
      case 1:
        switch (unidad) {
          case 0: return 'DIEZ'; case 1: return 'ONCE'; case 2: return 'DOCE';
          case 3: return 'TRECE'; case 4: return 'CATORCE'; case 5: return 'QUINCE';
          default: return 'DIECI' + Unidades(unidad);
        }
      case 2:
        return unidad === 0 ? 'VEINTE' : 'VEINTI' + Unidades(unidad);
      case 3: return unidad > 0 ? 'TREINTA Y ' + Unidades(unidad) : 'TREINTA';
      case 4: return unidad > 0 ? 'CUARENTA Y ' + Unidades(unidad) : 'CUARENTA';
      case 5: return unidad > 0 ? 'CINCUENTA Y ' + Unidades(unidad) : 'CINCUENTA';
      case 6: return unidad > 0 ? 'SESENTA Y ' + Unidades(unidad) : 'SESENTA';
      case 7: return unidad > 0 ? 'SETENTA Y ' + Unidades(unidad) : 'SETENTA';
      case 8: return unidad > 0 ? 'OCHENTA Y ' + Unidades(unidad) : 'OCHENTA';
      case 9: return unidad > 0 ? 'NOVENTA Y ' + Unidades(unidad) : 'NOVENTA';
      case 0: return Unidades(unidad);
      default: return '';
    }
  };
  const Centenas = (n: number) => {
    const centenas = Math.floor(n / 100);
    const decenas = n - (centenas * 100);
    switch (centenas) {
      case 1: return decenas > 0 ? 'CIENTO ' + Decenas(decenas) : 'CIEN';
      case 2: return 'DOSCIENTOS ' + Decenas(decenas);
      case 3: return 'TRESCIENTOS ' + Decenas(decenas);
      case 4: return 'CUATROCIENTOS ' + Decenas(decenas);
      case 5: return 'QUINIENTOS ' + Decenas(decenas);
      case 6: return 'SEISCIENTOS ' + Decenas(decenas);
      case 7: return 'SETECIENTOS ' + Decenas(decenas);
      case 8: return 'OCHOCIENTOS ' + Decenas(decenas);
      case 9: return 'NOVECIENTOS ' + Decenas(decenas);
      default: return Decenas(decenas);
    }
  };
  const Miles = (n: number) => {
    const miles = Math.floor(n / 1000);
    const resto = n - (miles * 1000);
    let strMiles = '';
    if (miles > 0) {
      strMiles = miles === 1 ? 'MIL' : Centenas(miles) + ' MIL';
    }
    return (strMiles + ' ' + Centenas(resto)).trim();
  };

  const enteros = Math.floor(num);
  const centimos = Math.round((num - enteros) * 100);
  
  // 1. Euros
  let textoEnteros = '';
  if (enteros === 0) {
    textoEnteros = 'CERO EUROS';
  } else if (enteros === 1) {
    textoEnteros = 'UN EURO';
  } else {
    textoEnteros = `${Miles(enteros)} EUROS`;
  }

  // 2. Céntimos
  let textoCentimos = '';
  if (centimos === 1) {
    textoCentimos = ' CON UN CÉNTIMO';
  } else if (centimos > 1) {
    textoCentimos = ` CON ${Miles(centimos)} CÉNTIMOS`;
  }

  // Si los céntimos son 0, textoCentimos se queda vacío y no añade nada
  return `${textoEnteros}${textoCentimos}`;
};
// -----------------------------------------------------------

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

  // Lógica para saber quién debe firmar
  const esEntregaDeBanda = recibo.tipo === 'LOTERIA' || recibo.tipo === 'MATERIAL';

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #zona-impresion, #zona-impresion * { visibility: visible; }
          #zona-impresion {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          html, body {
            overflow: hidden !important; 
            height: 100% !important;
            min-height: 0 !important;
            margin: 0;
            padding: 0;
          }
          .min-h-screen { min-height: 0 !important; }
        }
      `}</style>

      <div className="min-h-screen bg-slate-100 p-8 print:bg-white print:p-0">
        
        {/* Botones de acción */}
        <div className="max-w-3xl mx-auto mb-8 flex justify-between items-center print:hidden">
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
            Imprimir Recibo
          </button>
        </div>

        {/* PLANTILLA DEL RECIBO (El "papel") */}
        <div 
          id="zona-impresion" 
          className="max-w-3xl mx-auto bg-white p-12 border-2 border-slate-300 rounded-xl shadow-lg print:shadow-none print:border-none print:p-0"
        >
          
          {/* Cabecera */}
          <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-10">
            <div>
              <h1 className="text-3xl font-black uppercase text-slate-800">Agrupación Musical Isorana</h1>
            </div>
            <div className="text-right">
              <h2 className="text-4xl font-black text-indigo-600 tracking-wider print:text-black">RECIBO</h2>
              <p className="text-xl font-mono font-bold text-slate-700 mt-2">Nº {recibo.id.toString().padStart(6, '0')}</p>
            </div>
          </div>

          {/* Cuerpo de datos */}
          <div className="space-y-8 text-lg text-slate-800">
            
            <div className="flex">
              <span className="font-bold w-40 shrink-0">Fecha:</span>
              <span className="border-b border-slate-400 flex-grow pb-1 px-2 font-mono">
                {new Date(recibo.fechaEmision).toLocaleDateString('es-ES')}
              </span>
            </div>

            <div className="flex">
              <span className="font-bold w-40 shrink-0">
                {esEntregaDeBanda ? 'Entregado a:' : 'Recibí de:'}
              </span>
              <span className="border-b border-slate-400 flex-grow pb-1 px-2 font-bold uppercase">
                {recibo.destinatario}
              </span>
            </div>

            <div className="flex items-end">
              <span className="font-bold w-40 shrink-0">La cantidad de:</span>
              <span className="border-b border-slate-400 flex-grow pb-1 px-2">
                <span className="font-bold uppercase tracking-wide">{NumeroALetras(recibo.importe)}</span>
              </span>
              <span className="ml-4 px-6 py-2 bg-slate-100 border-2 border-slate-800 font-black text-2xl rounded">
                {recibo.importe.toFixed(2)} €
              </span>
            </div>

            <div className="flex">
              <span className="font-bold w-40 shrink-0">En concepto de:</span>
              <span className="border-b border-slate-400 flex-grow pb-1 px-2 uppercase">
                {recibo.concepto}
              </span>
            </div>
          </div>

          {/* Zona de Firmas */}
          <div className="mt-24 pt-8 flex justify-end">
            <div className="text-center w-72 relative">
              
              {/* Sello de Pagado */}
              {recibo.estado === 'PAGADO' && !esEntregaDeBanda && (
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 -rotate-12 border-4 border-emerald-600 text-emerald-600 font-black text-2xl px-6 py-2 rounded-lg opacity-60 print:border-black print:text-black">
                  PAGADO
                </div>
              )}

              <div className="border-t-2 border-slate-800 pt-3">
                <p className="font-bold text-sm uppercase">Firma:</p>
                <p className="text-slate-600 mt-1 font-medium">
                  {esEntregaDeBanda ? recibo.destinatario : 'Agrupación Musical Isorana'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}