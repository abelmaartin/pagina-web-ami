import Link from 'next/link';

export default function Academia() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      
      {/* --- CABECERA DE LA PÁGINA --- */}
      <section className="bg-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Escuela de Música</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Formamos a los músicos del mañana. Descubre nuestra oferta educativa para todas las edades y prepárate para dar el salto musical.
        </p>
      </section>

      {/* --- SECCIÓN: NUESTRA OFERTA EDUCATIVA --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">¿Qué ofrecemos?</h2>
          <div className="w-16 h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        {/* Cuadrícula de materias principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* 1. Música y movimiento */}
          <div className="bg-rose-50/50 p-8 rounded-3xl border border-rose-100 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left transition-all hover:shadow-md">
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex-shrink-0 flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Música y Movimiento</h3>
              <p className="text-slate-600 leading-relaxed">
                Desarrollo del sentido rítmico, auditivo y expresivo para los más pequeños. Aprenderán a sentir y vivir la música a través del juego y la expresión corporal.
              </p>
            </div>
          </div>

          {/* 2. Iniciación a la música */}
          <div className="bg-amber-50/50 p-8 rounded-3xl border border-amber-100 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left transition-all hover:shadow-md">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex-shrink-0 flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Iniciación a la Música</h3>
              <p className="text-slate-600 leading-relaxed">
                El primer contacto formal con el mundo sonoro. Los alumnos descubren los fundamentos musicales de forma amena, sentando unas bases sólidas para su futuro instrumento.
              </p>
            </div>
          </div>

          {/* 3. Solfeo */}
          <div className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left transition-all hover:shadow-md">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex-shrink-0 flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Solfeo (Lenguaje Musical)</h3>
              <p className="text-slate-600 leading-relaxed">
                Clases teóricas y prácticas para dominar la lectura de partituras, la rítmica y la entonación. El lenguaje universal que todo músico necesita dominar.
              </p>
            </div>
          </div>

          {/* 4. Instrumentos */}
          <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left transition-all hover:shadow-md">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex-shrink-0 flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Instrumentos</h3>
              <p className="text-slate-600 leading-relaxed">
                Clases personalizadas de las especialidades de Viento y Percusión. Adaptamos la enseñanza a tu ritmo para que puedas incorporarte a la banda.
              </p>
            </div>
          </div>

        </div>

        {/* 5. Novedad: Preparación Conservatorio */}
        <div className="relative bg-gradient-to-r from-indigo-50 to-purple-50 p-8 md:p-10 rounded-3xl border border-indigo-100 shadow-sm overflow-hidden flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
          {/* Etiqueta Novedad */}
          <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
            Novedad este curso
          </div>
          
          <div className="w-20 h-20 bg-white text-indigo-600 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-indigo-900 mb-3">Preparación para el Conservatorio</h3>
            <p className="text-indigo-950/80 leading-relaxed md:text-lg">
              Formación específica orientada a la introducción en las enseñanzas oficiales del <span className="font-semibold">Conservatorio de Música de Canarias</span>. Preparamos a nuestros alumnos para superar las pruebas de acceso con éxito, dotándolos del nivel técnico y teórico requerido.
            </p>
          </div>
        </div>

      </section>

      {/* --- SECCIÓN: INSTRUMENTOS (Mantenida igual porque coincide con Viento y Percusión) --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Especialidades Instrumentales</h2>
            <div className="w-16 h-1.5 bg-indigo-500 mx-auto rounded-full mb-8"></div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Ofrecemos formación en todas las familias de Viento y Percusión que componen nuestra banda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-4 pb-2 border-b border-slate-100">Viento Madera</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2"><span className="text-indigo-400">•</span> Flauta Travesera</li>
                <li className="flex items-center gap-2"><span className="text-indigo-400">•</span> Clarinete y Requinto</li>
                <li className="flex items-center gap-2"><span className="text-indigo-400">•</span> Saxofón (Alto, Tenor)</li>
                <li className="flex items-center gap-2"><span className="text-indigo-400">•</span> Oboe</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-amber-900 mb-4 pb-2 border-b border-slate-100">Viento Metal</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2"><span className="text-amber-400">•</span> Trompeta</li>
                <li className="flex items-center gap-2"><span className="text-amber-400">•</span> Trompa</li>
                <li className="flex items-center gap-2"><span className="text-amber-400">•</span> Trombón</li>
                <li className="flex items-center gap-2"><span className="text-amber-400">•</span> Bombardino y Tuba</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-emerald-900 mb-4 pb-2 border-b border-slate-100">Percusión</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2"><span className="text-emerald-400">•</span> Caja y Bombo</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">•</span> Batería</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">•</span> Timbales</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">•</span> Láminas (Xilófono, Lira...)</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECCIÓN: CTA (Llamada a la acción) --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Te animas a formar parte?</h2>
          <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
            Las matrículas suelen abrirse en septiembre, pero estamos encantados de informarte durante todo el año. Ponte en contacto con nosotros y resolveremos todas tus dudas.
          </p>
          <Link 
            href="/contacto" 
            className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:bg-slate-50 hover:scale-105 transition-all"
          >
            Solicitar Información
          </Link>
        </div>
      </section>

    </main>
  );
}