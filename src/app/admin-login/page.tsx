import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;

  async function handleLogin(formData: FormData) {
    'use server';
    const password = formData.get('password') as string;

    if (password === process.env.ADMIN_PASSWORD) {
      const cookieStore = await cookies(); // <-- Asegúrate de poner el await
      
      cookieStore.set('admin_session', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      redirect('/admin');
    } else {
      redirect('/admin-login?error=Contraseña incorrecta');
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 md:p-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Panel de Administración</h1>
          <p className="text-sm text-slate-500">Introduce la contraseña de acceso para gestionar la web.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form action={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="password">
              Contraseña
            </label>
            <input 
              type="password" 
              name="password" 
              id="password"
              required
              placeholder="••••••••••••"
              className="w-full border border-slate-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            />
          </div>

          <button 
            type="submit"
            className="mt-2 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition-colors shadow-md"
          >
            Entrar al Panel
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
            ← Volver a la página web pública
          </a>
        </div>
      </div>
    </main>
  );
}