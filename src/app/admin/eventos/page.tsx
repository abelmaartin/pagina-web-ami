import prisma from '@/lib/prisma';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Forzar que esta página NUNCA sea estática (siempre dinámica en servidor)
export const dynamic = 'force-dynamic';

export default async function GestionEventos() {
  // 0. Seguridad: comprobar que la cookie de administración existe
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');

  if (!sessionCookie || sessionCookie.value !== 'true') {
    redirect('/admin-login');
  }

  // 1. READ: Pedimos a Prisma todos los eventos ordenados por fecha
  const eventos = await prisma.evento.findMany({
    orderBy: { fecha: 'desc' },
  });

  // 2. DELETE: Server Action para borrar un evento
  async function eliminarEvento(formData: FormData) {
    'use server';
    const id = Number(formData.get('id'));
    
    await prisma.evento.delete({
      where: { id },
    });

    revalidatePath('/admin/eventos');
    revalidatePath('/eventos');
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/admin" className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold mb-2 inline-block">
            ← Volver al Panel
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Eventos</h1>
        </div>
        
        <Link 
          href="/admin/eventos/nuevo" 
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-md"
        >
          + Añadir Evento
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 text-gray-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 border-b border-gray-200">
              <th className="p-4 font-semibold">Título</th>
              <th className="p-4 font-semibold">Fecha</th>
              <th className="p-4 font-semibold">Tipo</th>
              <th className="p-4 font-semibold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento) => (
              <tr key={evento.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium">{evento.titulo}</td>
                <td className="p-4 text-gray-600">
                  {evento.fecha.toLocaleDateString('es-ES', { 
                    day: '2-digit', month: '2-digit', year: 'numeric', 
                    hour: '2-digit', minute: '2-digit' 
                  })}
                </td>
                <td className="p-4">
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full font-semibold">
                    {evento.tipo}
                  </span>
                </td>
                <td className="p-4 flex justify-end gap-4 items-center">
                  <Link 
                    href={`/admin/eventos/editar/${evento.id}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                  >
                    Editar
                  </Link>
                  
                  <form action={eliminarEvento}>
                    <input type="hidden" name="id" value={evento.id} />
                    <button 
                      type="submit" 
                      className="text-red-600 hover:text-red-800 font-semibold text-sm"
                    >
                      Borrar
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            
            {eventos.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No hay eventos creados. Haz clic en "Añadir Evento" para empezar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}