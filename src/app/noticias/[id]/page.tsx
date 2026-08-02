import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function DetalleNoticia({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const noticiaId = Number(id);

  // Buscamos la noticia exacta en la base de datos
  const noticia = await prisma.noticia.findUnique({
    where: { id: noticiaId },
  });

  // Si el ID no existe, mostramos error 404
  if (!noticia) {
    notFound();
  }

  const fechaFormateada = noticia.fecha.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <main className="flex flex-col min-h-screen bg-white">
      
      {/* Cabecera / Título de la Noticia */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/noticias" 
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold mb-6 transition-colors"
          >
            ← Volver a Noticias
          </Link>
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time>{fechaFormateada}</time>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            {noticia.titulo}
          </h1>
        </div>
      </section>

      {/* Cuerpo del Artículo */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex-grow">
        
        {noticia.imagenUrl && (
          <div className="mb-12 rounded-3xl overflow-hidden shadow-lg aspect-video bg-slate-100">
            <img 
              src={noticia.imagenUrl} 
              alt={noticia.titulo} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Contenido completo respetando saltos de línea y evitando que se salga el texto */}
        <div className="text-slate-700 text-lg leading-relaxed whitespace-pre-line break-words overflow-hidden bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200/60 shadow-sm">
          {noticia.contenido}
        </div>

      </section>

    </main>
  );
}