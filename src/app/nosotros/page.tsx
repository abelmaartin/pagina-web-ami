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

          {/* Espacio para foto histórica (marcador visual) */}
          <div className="bg-slate-100 aspect-square md:aspect-[4/3] rounded-3xl flex items-center justify-center border border-slate-200 shadow-inner p-8 text-center">
            <span className="text-slate-400 font-medium">
              [ Aquí puedes colocar una foto antigua o de algún momento histórico ]
            </span>
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
          <div className="w-full bg-slate-200 aspect-[16/9] md:aspect-[21/9] rounded-3xl flex items-center justify-center border border-slate-300 shadow-inner overflow-hidden p-8 text-center">
            <span className="text-slate-500 font-medium">
              [ Aquí irá la gran fotografía panorámica de toda la banda con sus componentes ]
            </span>
          </div>

        </div>
      </section>

    </main>
  );
}