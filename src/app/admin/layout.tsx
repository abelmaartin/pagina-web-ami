import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function cerrarSesion() {
  'use server';
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Menú Lateral (Sidebar) */}
      <aside className="w-64 bg-gray-900 text-white shadow-xl flex flex-col">
        <div className="p-6 text-center border-b border-gray-800">
          <h2 className="text-xl font-bold">Admin</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/admin"
            className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            🏠 Inicio
          </Link>
          <Link 
            href="/admin/eventos"
            className="block px-4 py-3 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            📅 Eventos
          </Link>
          <Link 
            href="/admin/noticias"
            className="block px-4 py-3 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            📰 Noticias
          </Link>
          <Link 
            href="/admin/galeria"
            className="block px-4 py-3 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            📸 Galería
          </Link>
          <Link 
            href="/admin/inscripciones"
            className="block px-4 py-3 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            👥​ Inscripciones
          </Link>
          <Link 
            href="/admin/inscripciones"
            className="block px-4 py-3 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            🧾 Recibos
          </Link>
        </nav>
      </aside>

      {/* Área de contenido principal donde cargarán las páginas */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}