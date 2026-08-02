import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect, notFound } from 'next/navigation';
import { put } from '@vercel/blob';

export default async function EditarNoticia({
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

  async function actualizarNoticia(formData: FormData) {
    'use server';
    
    const titulo = formData.get('titulo') as string;
    const extracto = formData.get('extracto') as string;
    const contenido = formData.get('contenido') as string;
    const archivoImagen = formData.get('imagen') as File;

    let imagenUrl = noticia!.imagenUrl; // Por defecto mantenemos la foto que ya tenía

    // Si sube una nueva foto, la mandamos a Vercel Blob
    if (archivoImagen && archivoImagen.size > 0) {
      const blob = await put(`noticias/${archivoImagen.name}`, archivoImagen, {
        access: 'public',
        addRandomSuffix: true,
      });
      imagenUrl = blob.url;
    }

    await prisma.noticia.update({
      where: { id: noticiaId },
      data: {
        titulo,
        extracto,
        contenido,
        imagenUrl,
      },
    });

    revalidatePath('/admin/noticias');
    revalidatePath('/noticias');
    revalidatePath(`/noticias/${noticiaId}`);
    redirect('/admin/noticias');
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Editar Noticia</h1>
        <a href="/admin/noticias" className="text-gray-500 hover:text-gray-800 underline">Cancelar</a>
      </div>
      
      <form action={actualizarNoticia} className="flex flex-col gap-6 bg-white p-8 rounded-xl shadow-lg text-gray-800">
        
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo" className="font-semibold">Título de la Noticia</label>
          <input 
            type="text" 
            id="titulo" 
            name="titulo" 
            defaultValue={noticia.titulo}
            required 
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="extracto" className="font-semibold">Extracto (Resumen corto)</label>
          <textarea 
            id="extracto" 
            name="extracto" 
            rows={2}
            defaultValue={noticia.extracto}
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contenido" className="font-semibold">Contenido Completo</label>
          <textarea 
            id="contenido" 
            name="contenido" 
            rows={6}
            defaultValue={noticia.contenido}
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Imagen Actual</label>
          {noticia.imagenUrl ? (
            <img src={noticia.imagenUrl} alt="Vista previa" className="w-32 h-20 object-cover rounded-lg border border-gray-200" />
          ) : (
            <p className="text-sm text-gray-400">Sin imagen asignada</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="imagen" className="font-semibold">Cambiar Imagen (Opcional)</label>
          <input 
            type="file" 
            id="imagen" 
            name="imagen" 
            accept="image/*"
            className="border border-gray-300 p-3 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        <button 
          type="submit" 
          className="mt-4 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
        >
          Guardar Cambios
        </button>
      </form>
    </main>
  );
}