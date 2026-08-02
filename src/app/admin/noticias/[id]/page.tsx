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

  const noticia = await prisma.noticia.findUnique({
    where: { id: noticiaId },
  });

  if (!noticia) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link 
        href="/noticias" 
        className="inline-block text-indigo-600 hover:text-indigo-800 font-semibold mb-8"
      >
        ← Volver a Noticias
      </Link>

      <article>
        <span className="text-indigo-600 text-sm font-bold uppercase tracking-wider block mb-2">
          {noticia.fecha.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
          {noticia.titulo}
        </h1>

        {noticia.imagenUrl && (
          <img 
            src={noticia.imagenUrl} 
            alt={noticia.titulo} 
            className="w-full h-80 object-cover rounded-2xl shadow-lg mb-8"
          />
        )}

        {/* white-space-pre-line respeta los saltos de línea que la directora escriba en el textarea */}
        <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          {noticia.contenido}
        </div>
      </article>
    </main>
  );
}