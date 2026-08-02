import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      
      {/* --- 1. HERO SECTION (Portada) --- */}
      <section className="relative bg-slate-900 text-white py-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
        {/* Fondo decorativo (Aquí luego pondremos una foto real de la banda) */}
        <div className="absolute inset-0 opacity-40 bg-slate-800 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto mt-8 md:mt-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Música, Cultura y Tradición en <span className="text-indigo-400">Guía de Isora</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Únete a nuestra familia musical. Disfruta de nuestros conciertos, descubre la historia de la Agrupación Musical Isorana y aprende a tocar tu instrumento favorito con nosotros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/nosotros" 
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30"
            >
              Conoce a la Banda
            </Link>
            <Link 
              href="/academia" 
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-sm transition-all border border-white/20"
            >
              Nuestra Academia
            </Link>
          </div>
        </div>
      </section>

      {/* --- 2. SECCIÓN DE DESTACADOS (Tarjetas) --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">¿Qué ofrecemos?</h2>
            <div className="w-24 h-1.5 bg-indigo-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Tarjeta 1: La Banda */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">La Banda</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Más de 60 años poniendo banda sonora a nuestro municipio. Descubre nuestra historia y el equipo de músicos que la componen.
              </p>
              <Link href="/nosotros" className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1">
                Leer más <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Tarjeta 2: La Academia */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Escuela de Música</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Formamos a los futuros talentos. Clases de iniciación a la música, solfeo, música y movimiento y especialización instrumental en la familia de viento y percusión con un profesorado apasionado y cercano.
              </p>
              <Link href="/academia" className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1">
                Información y matrículas <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Tarjeta 3: Eventos */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Próximos Conciertos</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                No te pierdas nuestras próximas actuaciones, procesiones y audiciones. Consulta nuestro calendario y acompáñanos.
              </p>
              <Link href="/eventos" className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1">
                Ver calendario <span aria-hidden="true">→</span>
              </Link>
            </div>

          </div>
        </div>
      </section>
      
    </main>
  );
}