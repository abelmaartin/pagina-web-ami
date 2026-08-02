import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function NoticiasPublicas() {
  // 1. Pedimos las noticias reales de la base de datos
  const noticiasDb = await prisma.noticia.findMany({
    orderBy: { fecha: 'desc' },
  });

  // 2. Adaptamos los datos al formato visual limpio de tu plantilla
  const noticias = noticiasDb.map((noticia) => ({
    id: noticia.id,
    titulo: noticia.titulo,
    resumen: noticia.extracto,
    fecha: noticia.fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
    categoria: "Actualidad", // Categoría por defecto (puedes añadir un campo categoría en Prisma si lo deseas)
    colorCategoria: "bg-indigo-100 text-indigo-700",
    imagenUrl: noticia.imagenUrl,
    slug: `/noticias/${noticia.id}`,
  }));

  return (
    <main className="flex flex-col min-h-screen bg-white">
      
      {/* --- CABECERA DE LA PÁGINA --- */}
      <section className="bg-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Últimas Noticias</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Entérate de toda la actualidad de la Agrupación Musical Isorana, información de nuestras actuaciones y novedades de nuestra escuela.
        </p>
      </section>

      {/* --- REJILLA DE NOTICIAS --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {noticias.map((noticia) => (
            <article key={noticia.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group">
              
              {/* Imagen o Marcador de posición */}
              <div className="aspect-video bg-slate-100 relative overflow-hidden flex items-center justify-center">
                {noticia.imagenUrl ? (
                  <img 
                    src={noticia.imagenUrl} 
                    alt={noticia.titulo} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <svg className="w-12 h-12 text-slate-300 group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
                
                {/* Etiqueta de Categoría flotante */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${noticia.colorCategoria}`}>
                    {noticia.categoria}
                  </span>
                </div>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <time className="text-sm text-slate-500 font-medium mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {noticia.fecha}
                </time>
                
                <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
                  <Link href={noticia.slug}>
                    {noticia.titulo}
                  </Link>
                </h2>
                
                <p className="text-slate-600 mb-6 leading-relaxed flex-grow text-sm">
                  {noticia.resumen}
                </p>
                
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <Link href={noticia.slug} className="text-indigo-600 font-bold text-sm flex items-center gap-1 hover:text-indigo-800 transition-colors">
                    Leer artículo completo 
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>

            </article>
          ))}

        </div>

        {noticias.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
            <p className="text-lg text-slate-500 font-medium">No hay noticias publicadas en este momento.</p>
          </div>
        )}

      </section>

    </main>
  );
}