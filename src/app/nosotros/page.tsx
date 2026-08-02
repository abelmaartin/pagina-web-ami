import Image from 'next/image';

export default function Nosotros() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      
      {/* --- CABECERA DE LA PÁGINA --- */}
      <section className="bg-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Nuestra Historia</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Conoce las raíces, la trayectoria y el equipo humano que da vida a la Agrupación Musical Isorana.
        </p>
      </section>

      {/* --- SECCIÓN: LA HISTORIA --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Texto de la historia */}
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Más de 60 años de música</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                La Agrupación Musical Isorana ha formado parte de la banda sonora del municipio de Guía de Isora a lo largo de los años. Desde nuestros comienzos, hemos crecido no solo en número de componentes, sino en calidad musical y compromiso cultural con nuestro pueblo.
              </p>
              <p>
                Nuestro objetivo siempre ha sido acercar la música a cada rincón, participando activamente en las festividades, conciertos, procesiones y certámenes, llevando con orgullo el nombre de Guía de Isora allá donde vamos.
              </p>
              <p>
                Generación tras generación, padres, hijos y abuelos han compartido atril en nuestros ensayos, formando una gran familia unida por la pasión hacia el arte musical.
              </p>
            </div>
          </div>

          {/* Foto histórica (Ajustada para ser vertical) */}
          <div className="relative w-full aspect-[3/4] md:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-slate-100">
            <Image 
              src="/antigua.jpeg"
              alt="Foto histórica de la Agrupación Musical Isorana"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

        </div>
      </section>

      {/* --- SECCIÓN: NUESTROS MÚSICOS (Foto de toda la banda) --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Nuestros Músicos</h2>
            <div className="w-16 h-1.5 bg-indigo-500 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              El verdadero corazón de la agrupación. Un grupo intergeneracional de músicos unidos por el compañerismo y la dedicación en cada ensayo y actuación.
            </p>
          </div>

          {/* Contenedor panorámico para la foto de grupo */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            <Image 
              src="/banda.jpeg"
              alt="Fotografía panorámica de la Agrupación Musical Isorana"
              fill
              className="object-cover"
              sizes="100vw"
              priority /* Le da prioridad de carga al ser una foto tan grande e importante */
            />
          </div>

        </div>
      </section>

    </main>
  );
}