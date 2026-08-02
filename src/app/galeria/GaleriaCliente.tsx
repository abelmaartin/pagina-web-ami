"use client";

import { useState } from 'react';

export default function GaleriaCliente({ albumes }: { albumes: any[] }) {
  const [albumAbierto, setAlbumAbierto] = useState<any>(null);

  return (
    <main className="flex flex-col min-h-screen bg-white">
      
      {/* --- CABECERA DE LA PÁGINA --- */}
      <section className="bg-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 text-center transition-all duration-500">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {albumAbierto ? albumAbierto.titulo : "Galería de Imágenes"}
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {albumAbierto 
            ? `Imágenes correspondientes al evento celebrado el ${albumAbierto.fecha}.`
            : "Un recorrido visual organizado por eventos y actuaciones de la Agrupación Musical Isorana."}
        </p>
      </section>

      {/* --- CONTENIDO DINÁMICO --- */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow">
        
        {!albumAbierto ? (
          
          /* =========================================
             VISTA 1: LISTADO DE ÁLBUMES (PORTADAS)
             ========================================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {albumes.map((album) => (
              <div 
                key={album.id} 
                onClick={() => setAlbumAbierto(album)}
                className="group relative aspect-[4/3] bg-slate-200 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Portada Real de Vercel Blob o marcador si no tiene */}
                {album.portadaUrl ? (
                  <img 
                    src={album.portadaUrl} 
                    alt={album.titulo} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                    Sin portada
                  </div>
                )}

                {/* Capa superpuesta oscura y Textos */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent flex flex-col justify-end p-6">
                  
                  {/* Etiqueta cantidad de fotos */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {album.fotos.length} fotos
                  </div>

                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2 block">
                      {album.categoria}
                    </span>
                    <h3 className="text-white text-xl font-bold leading-tight">
                      {album.titulo}
                    </h3>
                  </div>
                </div>
              </div>
            ))}

            {albumes.length === 0 && (
              <div className="col-span-full text-center py-20 text-slate-500">
                Aún no hay álbumes publicados.
              </div>
            )}
          </div>

        ) : (

          /* =========================================
             VISTA 2: FOTOS DENTRO DEL ÁLBUM ABIERTO
             ========================================= */
          <div className="animate-in fade-in duration-500">
            
            {/* Botón para volver a los álbumes */}
            <button 
              onClick={() => setAlbumAbierto(null)}
              className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-bold mb-8 transition-colors group"
            >
              <div className="w-10 h-10 bg-slate-100 group-hover:bg-indigo-50 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
              Volver a todos los álbumes
            </button>

            {/* Cuadrícula de fotos reales del evento */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {albumAbierto.fotos.map((foto: any) => (
                <div 
                  key={foto.id} 
                  className="aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative group cursor-pointer shadow-sm"
                >
                  <img 
                    src={foto.url} 
                    alt="Foto del álbum" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Hover sutil en cada foto */}
                  <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-colors duration-300"></div>
                </div>
              ))}
            </div>

            {albumAbierto.fotos.length === 0 && (
              <div className="text-center py-20 text-slate-500">
                Este álbum todavía no contiene fotografías.
              </div>
            )}

          </div>
        )}

      </section>

    </main>
  );
}