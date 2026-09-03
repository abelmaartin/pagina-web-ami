import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Forzar que esta página NUNCA sea estática (siempre dinámica en servidor)
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  // Doble seguridad: si no hay cookie, fuera de aquí inmediatamente
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');

  if (!sessionCookie || sessionCookie.value !== 'true') {
    redirect('/admin-login');
  }

  return (
    <main className="max-w-5xl mx-auto p-6 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Panel de Administración</h1>
          <p className="text-gray-600">Bienvenido al panel de gestión de la Agrupación Musical Isorana.</p>
        </div>

        {/* Botón de Cerrar Sesión */}
        <form action={async () => {
          'use server';
          const cs = await cookies();
          cs.delete('admin_session');
          redirect('/admin-login');
        }}>
          <button type="submit" className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition-colors text-sm">
            Cerrar Sesión 🚪
          </button>
        </form>
      </div>
      
      <div className="w-full text-center mt-6">
        <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
          Desde aquí podrás gestionar todo el contenido de la página web.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
          <Link href="/admin/eventos" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-left">
            <div className="text-4xl mb-3">📅</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Gestionar Eventos</h2>
            <p className="text-gray-500 text-sm">Añade nuevos conciertos, ensayos o academias al calendario.</p>
          </Link>

          <Link href="/admin/noticias" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-left">
            <div className="text-4xl mb-3">📰</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Noticias</h2>
            <p className="text-gray-500 text-sm">Comparte las noticias más recientes.</p>
          </Link>

          <Link href="/admin/galeria" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-left">
            <div className="text-4xl mb-3">📸</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Galería</h2>
            <p className="text-gray-500 text-sm">Añade fotos de nuestras actuaciones.</p>
          </Link>

          <Link href="/admin/inscripciones" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-left">
            <div className="text-4xl mb-3">👥​</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Inscripciones</h2>
            <p className="text-gray-500 text-sm">Accede a las solicitudes de incripciones</p>
          </Link>

          <Link href="/admin/recibos" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-left">
            <div className="text-4xl mb-3">🧾</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Recibos</h2>
            <p className="text-gray-500 text-sm">Gestiona los recibos de la banda</p>
          </Link>
        </div>
      </div>
    </main>
  );
}