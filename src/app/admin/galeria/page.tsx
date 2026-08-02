import prisma from '@/lib/prisma';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import BotonBorrar from '@/components/BotonBorrar';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Forzar que esta página NUNCA sea estática (siempre dinámica en servidor)
export const dynamic = 'force-dynamic';

export default async function GestionGaleria() {
  // 0. Seguridad: comprobar que la cookie de administración existe
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');

  if (!sessionCookie || sessionCookie.value !== 'true') {
    redirect('/admin-login');
  }

  // 1. Pedimos a la base de datos todos los álbumes ordenados por los más recientes
  const albumes = await prisma.album.findMany({
    orderBy: { fecha: 'desc' },
    include: {
      _count: {
        select: { fotos: true }
      }
    }
  });

  // 2. Server Action para eliminar un álbum completo
  async function eliminarAlbum(formData: FormData) {
    'use server';
    const albumId = Number(formData.get('albumId'));

    await prisma.album.delete({
      where: { id: albumId },
    });

    revalidatePath('/admin/galeria');
    revalidatePath('/galerias');
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/admin" className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold mb-2 inline-block">
            ← Volver al Panel
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Galería</h1>
        </div>
        
        <Link 
          href="/admin/galeria/nuevo" 
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-md"
        >
          + Nuevo Álbum
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {albumes.map((album) => (
          <div key={album.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col justify-between">
            <div>
              {album.portadaUrl ? (
                <img 
                  src={album.portadaUrl} 
                  alt={`Portada de ${album.titulo}`} 
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  Sin foto de portada
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-800 truncate flex-1">{album.titulo}</h3>
                  <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full font-semibold ml-2">
                    {album._count.fotos} fotos
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  {album.fecha.toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 flex gap-2">
              <Link 
                href={`/admin/galeria/${album.id}`}
                className="flex-1 text-center bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg font-semibold hover:bg-indigo-100 transition-colors text-sm"
              >
                Gestionar Fotos
              </Link>
              
              <form action={eliminarAlbum}>
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
        ))}

        {albumes.length === 0 && (
          <div className="col-span-3 text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
            Aún no hay álbumes. Crea el primero para empezar a subir fotos.
          </div>
        )}
      </div>
    </main>
  );
}