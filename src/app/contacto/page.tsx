"use client";

import { useState } from 'react';
import { enviarCorreo } from '@/actions/enviarCorreo';

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCargando(true);

    // Guardamos la referencia del formulario antes de que React lo desmonte
    const formElement = e.currentTarget;

    const formData = new FormData(formElement);
    const resultado = await enviarCorreo(formData);

    setCargando(false);

    if (resultado.success) {
      formElement.reset(); // Limpiamos usando la referencia guardada
      setEnviado(true);
      setTimeout(() => setEnviado(false), 5000);
    } else {
      alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">
      
      {/* --- CABECERA DE LA PÁGINA --- */}
      <section className="bg-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contacta con nosotros</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          ¿Quieres unirte a la banda, matricularte en la academia o contar con nosotros para tus fiestas? Escríbenos y te responderemos lo antes posible.
        </p>
      </section>

      {/* --- SECCIÓN PRINCIPAL: INFO Y FORMULARIO --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Columna Izquierda: Información de contacto y Mapa */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Información Directa</h2>
            
            <div className="space-y-8 flex-grow">
              {/* Dirección */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Sede de Ensayo</h3>
                  <p className="text-slate-600 mt-1 mb-3">
                    Local de la Agrupación Musical Isorana<br />
                    Calle del Campo, 15, Guía de Isora, Santa Cruz de Tenerife
                  </p>
                  
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 inline-block">
                    <p className="text-sm text-amber-800 font-medium flex items-center gap-2">
                      <span>Entrada junto al parque infantil.</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Teléfonos</h3>
                  <p className="text-slate-600 mt-1">
                    +34 663 453 335 <br/>
                    +34 616 512 292 <br/>
                    +34 669 299 986 <br/>
                    <span className="text-sm text-slate-400">(Atención vía llamadas y WhatsApp)</span>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Correo Electrónico</h3>
                  <p className="text-slate-600 mt-1">
                    agrupacionmusicalisorana@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Síguenos en redes sociales</h3>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/profile.php?id=100063679471614&locale=es_ES" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-11 h-11 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
                <a href="https://www.instagram.com/agrupacionmusicalisorana/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-11 h-11 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </a>
                <a href="https://www.tiktok.com/@a.m.isorana?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-11 h-11 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" /></svg>
                </a>
                <a href="https://youtube.com/@agrupacionmusicalisorana1958?si=dFpLQq7eGviQyEFC" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-11 h-11 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
              </div>
            </div>

            {/* Mapa */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-64 w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3737.6418242806244!2d-16.780076674644366!3d28.211784032464056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc6a8e4f10f99769%3A0x2e0a6adbee7a301!2sAgrupaci%C3%B3n%20Musical%20Isorana!5e0!3m2!1ses!2ses!4v1784981775061!5m2!1ses!2ses" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100 h-fit">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Envíanos un mensaje</h2>
            
            {enviado ? (
              <div className="bg-emerald-50 text-emerald-700 p-6 rounded-2xl border border-emerald-200 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">¡Mensaje enviado con éxito!</h3>
                <p>Nos pondremos en contacto contigo lo antes posible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre completo</label>
                    <input 
                      type="text" 
                      name="nombre"
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800"
                      placeholder="Ej. María García"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Teléfono</label>
                    <input 
                      type="tel" 
                      name="telefono"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800"
                      placeholder="Ej. 600 000 000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Correo electrónico</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Motivo de contacto</label>
                  <select 
                    name="motivo"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800"
                  >
                    <option value="">Selecciona un motivo...</option>
                    <option value="Información sobre la Academia">Información sobre la Academia</option>
                    <option value="Unirme a la Banda">Unirme a la Banda</option>
                    <option value="Contratación para Eventos/Fiestas">Contratación para Eventos/Fiestas</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Mensaje</label>
                  <textarea 
                    name="mensaje"
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none text-slate-800"
                    placeholder="Escribe aquí tu consulta detallada..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={cargando}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
                >
                  {cargando ? 'Enviando mensaje...' : 'Enviar Mensaje'}
                </button>
              </form>
            )}

          </div>
        </div>
      </section>

    </main>
  );
}