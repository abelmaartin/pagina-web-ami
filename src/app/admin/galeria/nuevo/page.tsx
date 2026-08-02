import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { put } from '@vercel/blob';

export default function NuevoAlbum() {
  async function crearAlbum(formData: FormData) {
    'use server';
    
    const titulo = formData.get('titulo') as string;
    const fechaString = formData.get('fecha') as string;
    const archivoFoto = formData.get('portada') as File;

    let portadaUrl = null;

    // MAGIA DE VERCEL BLOB: Si la directora ha seleccionado un archivo y tiene tamaño
    if (archivoFoto && archivoFoto.size > 0) {
      // Usamos la función put() para subirlo directo a la nube.
      // Le ponemos un prefijo 'portadas/' para que esté ordenado en tu nube.
      const blob = await put(`portadas/${archivoFoto.name}`, archivoFoto, {
        access: 'public',
        addRandomSuffix: true,
      });
      // Vercel nos devuelve una URL pública y segura. La guardamos en nuestra variable.
      portadaUrl = blob.url;
    }

    // Guardamos los datos del álbum en SQLite (con la URL que nos dio Vercel)
    await prisma.album.create({
      data: {
        titulo,
        fecha: new Date(fechaString),
        portadaUrl,
      },
    });

    revalidatePath('/admin/galeria');
    redirect('/admin/galeria');
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Crear Nuevo Álbum</h1>
        <a href="/admin/galeria" className="text-gray-500 hover:text-gray-800 underline">Cancelar</a>
      </div>
      
      <form action={crearAlbum} className="flex flex-col gap-6 bg-white p-8 rounded-xl shadow-lg text-gray-800">
        
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo" className="font-semibold">Título del Álbum</label>
          <input 
            type="text" 
            id="titulo" 
            name="titulo" 
            required 
            placeholder="Ej: Concierto de Santa Cecilia 2025"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="fecha" className="font-semibold">Fecha del evento</label>
          <input 
            type="date" 
            id="fecha" 
            name="fecha" 
            required 
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="portada" className="font-semibold">Foto de Portada</label>
          {/* El input type="file" con accept="image/*" asegura que solo pueda subir fotos */}
          <input 
            type="file" 
            id="portada" 
            name="portada" 
            accept="image/*"
            required
            className="border border-gray-300 p-3 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          <p className="text-sm text-gray-500">Esta será la foto principal que represente al álbum.</p>
        </div>

        <button 
          type="submit" 
          className="mt-4 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
        >
          Crear Álbum
        </button>
      </form>
    </main>
  );
}