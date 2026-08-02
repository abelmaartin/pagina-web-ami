import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { put } from '@vercel/blob';

export default function NuevaNoticia() {
  async function crearNoticia(formData: FormData) {
    'use server';
    
    const titulo = formData.get('titulo') as string;
    const extracto = formData.get('extracto') as string;
    const contenido = formData.get('contenido') as string;
    const archivoImagen = formData.get('imagen') as File;

    let imagenUrl = null;

    if (archivoImagen && archivoImagen.size > 0) {
      const blob = await put(`noticias/${archivoImagen.name}`, archivoImagen, {
        access: 'public',
        addRandomSuffix: true,
      });
      imagenUrl = blob.url;
    }

    await prisma.noticia.create({
      data: {
        titulo,
        extracto,
        contenido,
        imagenUrl,
      },
    });

    revalidatePath('/admin/noticias');
    revalidatePath('/noticias');
    redirect('/admin/noticias');
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Publicar Nueva Noticia</h1>
        <a href="/admin/noticias" className="text-gray-500 hover:text-gray-800 underline">Cancelar</a>
      </div>
      
      <form action={crearNoticia} className="flex flex-col gap-6 bg-white p-8 rounded-xl shadow-lg text-gray-800">
        
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo" className="font-semibold">Título de la Noticia</label>
          <input 
            type="text" 
            id="titulo" 
            name="titulo" 
            required 
            placeholder="Ej: Abierto el plazo de matrícula para la Academia"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="extracto" className="font-semibold">Extracto (Resumen corto)</label>
          <textarea 
            id="extracto" 
            name="extracto" 
            rows={2}
            required
            placeholder="Un par de líneas que aparecerán en la tarjeta principal..."
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contenido" className="font-semibold">Contenido Completo</label>
          <textarea 
            id="contenido" 
            name="contenido" 
            rows={6}
            required
            placeholder="Escribe aquí todos los detalles de la noticia..."
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="imagen" className="font-semibold">Imagen Destacada (Opcional)</label>
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
          Publicar Noticia
        </button>
      </form>
    </main>
  );
}