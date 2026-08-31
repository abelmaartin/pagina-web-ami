import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function Eventos() {
  // 1. Hacemos la consulta a la base de datos
  const eventosBd = await prisma.evento.findMany({
    orderBy: {
      fecha: 'asc', // Esto ya ordenaba correctamente por fecha
    },
  });

  // 2. LÓGICA DE FECHAS: Separamos los eventos futuros de los pasados
  const ahora = new Date();
  
  // Los que aún no han ocurrido (o están ocurriendo hoy)
  const eventosFuturos = eventosBd.filter((e) => new Date(e.fecha) >= ahora);
  
  // Los que ya pasaron (les damos la vuelta para que el evento de "ayer" salga antes que el de "hace un año")
  const eventosPasados = eventosBd.filter((e) => new Date(e.fecha) < ahora).reverse();
  
  // Juntamos las dos listas: primero los futuros, luego los pasados
  const todosLosEventos = [...eventosFuturos, ...eventosPasados];

  return (
    <main className="flex flex-col min-h-screen bg-white">
      
      {/* --- CABECERA DE LA PÁGINA --- */}
      <section className="bg-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Próximos Eventos</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Acompáñanos en nuestras próximas actuaciones. Consulta nuestro calendario de conciertos, procesiones y audiciones.
        </p>
      </section>

      {/* --- LISTA DE EVENTOS DINÁMICA --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="space-y-8">
          
          {todosLosEventos.map((evento) => {
            const fechaObjeto = new Date(evento.fecha);
            
            // Comprobamos si el evento ya ha pasado
            const esPasado = fechaObjeto < ahora;
            
            // Formateo de fechas
            const diaSemanaRaw = fechaObjeto.toLocaleDateString('es-ES', { weekday: 'long' });
            const diaSemana = diaSemanaRaw.charAt(0).toUpperCase() + diaSemanaRaw.slice(1);
            const fechaCorta = fechaObjeto.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
            const hora = fechaObjeto.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

            return (
              <div 
                key={evento.id} 
                // 👇 Si es pasado, aplicamos opacidad y escala de grises
                className={`bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row ${
                  esPasado ? 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100 duration-500' : ''
                }`}
              >
                
                {/* Bloque de Fecha (Izquierda) */}
                <div className={`${evento.color || 'bg-slate-50 text-slate-600'} p-6 md:w-48 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r text-center shrink-0`}>
                  <span className="text-sm font-bold uppercase tracking-wider mb-1">{diaSemana}</span>
                  <span className="text-3xl md:text-4xl font-extrabold capitalize">{fechaCorta}</span>
                  <span className="mt-3 px-3 py-1 bg-white/60 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm shadow-sm border border-white/20">
                    {evento.tipo}
                  </span>
                  
                  {/* 👇 Etiqueta de FINALIZADO si la fecha ya pasó */}
                  {esPasado && (
                    <span className="mt-2 px-3 py-1 bg-slate-800 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                      Finalizado
                    </span>
                  )}
                </div>

                {/* Contenido del Evento (Derecha) */}
                <div className="p-6 md:p-8 flex-grow flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">
                    {evento.titulo}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {evento.descripcion}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-auto">
                    {/* Hora */}
                    <div className="flex items-center gap-2 text-slate-500 font-medium">
                      <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {hora} h
                    </div>
                    {/* Lugar */}
                    <div className="flex items-center gap-2 text-slate-500 font-medium">
                      <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {evento.lugar}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

        {/* Mensaje dinámico si no hay eventos en la Base de Datos */}
        {todosLosEventos.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-100">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-bold text-slate-700 mb-2">No hay eventos programados</h3>
            <p className="text-slate-500">Actualmente no tenemos próximas actuaciones. ¡Vuelve a revisar pronto!</p>
          </div>
        )}

      </section>

      {/* --- SECCIÓN: LLAMADA A LA ACCIÓN --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">¿Quieres contar con nosotros?</h2>
          <div className="w-16 h-1.5 bg-indigo-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Nuestra agrupación está disponible para procesiones, pasacalles, conciertos y todo tipo de actos culturales y festivos.
          </p>
          <Link 
            href="/contacto" 
            className="inline-block px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105"
          >
            Solicitar Información
          </Link>
        </div>
      </section>

    </main>
  );
}