import prisma from '@/lib/prisma';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import BotonBorrar from '@/components/BotonBorrar';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Forzar que esta página NUNCA sea estática (siempre dinámica en servidor)
export const dynamic = 'force-dynamic';

export default async function GestionNoticias() {
  // 0. Seguridad: comprobar que la cookie de administración existe
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');

  if (!sessionCookie || sessionCookie.value !== 'true') {
    redirect('/admin-login');
  }

  const noticias = await prisma.noticia.findMany({
    orderBy: { fecha: 'desc' },
  });

  async function eliminarNoticia(formData: FormData) {
    'use server';
    const id = Number(formData.get('id'));

    await prisma.noticia.delete({
      where: { id },
    });

    revalidatePath('/admin/noticias');
    revalidatePath('/noticias');
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/admin" className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold mb-2 inline-block">
            ← Volver al Panel
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Noticias</h1>
        </div>

        <Link 
          href="/admin/noticias/nuevo" 
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-md"
        >
          + Nueva Noticia
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 text-gray-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 border-b border-gray-200">
              <th className="p-4 font-semibold">Título</th>
              <th className="p-4 font-semibold">Fecha</th>
              <th className="p-4 font-semibold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {noticias.map((noticia) => (
              <tr key={noticia.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium">{noticia.titulo}</td>
                <td className="p-4 text-gray-600">
                  {noticia.fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </td>
                <td className="p-4 flex justify-end gap-4 items-center">
                  {/* Botón de Editar */}
                  <Link 
                    href={`/admin/noticias/${noticia.id}/editar`}
                    className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-slate-200 transition-colors text-sm"
                  >
                    Editar
                  </Link>
                  <form action={eliminarNoticia}>
                    <input type="hidden" name="id" value={noticia.id} />
                    <BotonBorrar 
                      mensaje="¿Estás seguro de que quieres eliminar esta noticia?"
                      className="text-red-600 hover:text-red-800 font-semibold cursor-pointer text-sm"
                    >
                      Borrar
                    </BotonBorrar>
                  </form>
                </td>
              </tr>
            ))}
            
            {noticias.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-500">
                  No hay noticias publicadas. Haz clic en "Nueva Noticia" para empezar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}