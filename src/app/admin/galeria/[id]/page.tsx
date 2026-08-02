import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';
import { put } from '@vercel/blob';
import BotonBorrar from '@/components/BotonBorrar';

export default async function DetalleAlbum({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const albumId = Number(id);

  const album = await prisma.album.findUnique({
    where: { id: albumId },
    include: {
      fotos: {
        orderBy: { id: 'desc' },
      },
    },
  });

  if (!album) {
    notFound();
  }

  // Server Action: Subir múltiples fotos
  async function subirFotos(formData: FormData) {
    'use server';
    const archivos = formData.getAll('fotos') as File[];

    for (const archivo of archivos) {
      if (archivo && archivo.size > 0) {
        const blob = await put(`albumes/${albumId}/${archivo.name}`, archivo, {
          access: 'public',
          addRandomSuffix: true,
        });

        await prisma.foto.create({
          data: {
            url: blob.url,
            albumId: albumId,
          },
        });
      }
    }

    revalidatePath(`/admin/galeria/${albumId}`);
    revalidatePath('/galeria');
  }

  // Server Action: Borrar foto individual
  async function eliminarFoto(formData: FormData) {
    'use server';
    const fotoId = Number(formData.get('fotoId'));

    await prisma.foto.delete({
      where: { id: fotoId },
    });

    revalidatePath(`/admin/galeria/${albumId}`);
    revalidatePath('/galeria');
  }

  // Server Action: Borrar álbum completo desde el detalle
  async function eliminarAlbumCompleto() {
    'use server';
    await prisma.album.delete({
      where: { id: albumId },
    });

    revalidatePath('/admin/galeria');
    revalidatePath('/galeria');
    redirect('/admin/galeria');
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{album.titulo}</h1>
          <p className="text-gray-500">{album.fecha.toLocaleDateString('es-ES')}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href="/admin/galeria" 
            className="text-indigo-600 hover:text-indigo-800 font-semibold underline text-sm"
          >
            ← Volver a Álbumes
          </a>

          {/* Botón para eliminar todo el álbum */}
          <form action={eliminarAlbumCompleto}>
            <input type="hidden" name="albumId" value={album.id} />
            <BotonBorrar 
              mensaje="¿Estás seguro de que quieres eliminar este álbum entero? Se borrarán también todas las fotos."
              className="bg-red-50 text-red-600 px-3 py-2 rounded-lg font-semibold hover:bg-red-100 transition-colors text-sm"
            >
              🗑️
            </BotonBorrar>
          </form>
        </div>
      </div>

      {/* Formulario de subida múltiple */}
      <form action={subirFotos} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8 flex flex-col md:flex-row items-center gap-4 text-gray-800">
        <div className="flex-1 w-full">
          <label htmlFor="fotos" className="block font-semibold mb-2">Añadir nuevas fotos al álbum</label>
          <input 
            type="file" 
            id="fotos" 
            name="fotos" 
            accept="image/*"
            multiple 
            required
            className="w-full border border-gray-300 p-2 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        <button 
          type="submit" 
          className="mt-6 md:mt-0 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors shadow-md whitespace-nowrap"
        >
          Subir Fotos
        </button>
      </form>

      {/* Cuadrícula de fotos actuales */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Fotos en este álbum ({album.fotos.length})</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {album.fotos.map((foto) => (
          <div key={foto.id} className="relative group bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <img 
              src={foto.url} 
              alt="Foto del álbum" 
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <form action={eliminarFoto} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <input type="hidden" name="fotoId" value={foto.id} />
              <BotonBorrar 
                mensaje="¿Seguro que quieres eliminar esta foto?"
                className="bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors text-xs font-bold"
              >
                ✕
              </BotonBorrar>
            </form>
          </div>
        ))}
      </div>

      {album.fotos.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
          Este álbum aún no tiene fotos. ¡Usa el formulario de arriba para subir las primeras!
        </div>
      )}
    </main>
  );
}