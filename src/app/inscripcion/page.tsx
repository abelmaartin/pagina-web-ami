"use client";

import { useState } from 'react';
import Link from 'next/link';
import { registrarPreinscripcion } from '@/actions/preinscripciones';

export default function Academia() {
  // Estado para controlar si el alumno es menor de edad
  const [esMenor, setEsMenor] = useState(false);
  
  // Estado para controlar si acepta la política de privacidad
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
  
  // Estado para guardar todos los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '', apellidos: '', fechaNacimiento: '',
    telefono: '', email: '',
    tutorNombre: '', tutorDni: '', tutorTelefono: '',
    instrumento: '', experiencia: 'No', observaciones: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Llamamos a la función del servidor directamente, pasándole los datos
    const respuesta = await registrarPreinscripcion({
      ...formData,
      esMenor
    });

    if (respuesta.success) {
      alert("¡Solicitud enviada correctamente! Nos pondremos en contacto contigo pronto.");
      
      // Limpiamos el formulario
      setFormData({
        nombre: '', apellidos: '', fechaNacimiento: '',
        telefono: '', email: '',
        tutorNombre: '', tutorDni: '', tutorTelefono: '',
        instrumento: '', experiencia: 'No', observaciones: ''
      });
      setEsMenor(false);
      setAceptaPrivacidad(false); // Desmarcamos la casilla
    } else {
      alert("Hubo un problema al enviar la solicitud. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">
      
      {/* --- CABECERA DE LA PÁGINA --- */}
      <section className="bg-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Inscripción</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
          Descubre nuestra oferta educativa. Si ya lo tienes claro, rellena el formulario de preinscripción y nos pondremos en contacto contigo a la mayor brevedad posible.
        </p>
        <a 
          href="#formulario-inscripcion" 
          className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Ir al formulario ↓
        </a>
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

      {/* --- SECCIÓN: INSTRUMENTOS --- */}
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

      {/* --- SECCIÓN: FORMULARIO DE INSCRIPCIÓN --- */}
      <section id="formulario-inscripcion" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Formulario de Preinscripción</h2>
            <p className="text-slate-600">
              Completa tus datos y contactaremos contigo para formalizar la matrícula y resolver dudas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Bloque 1: Datos del Alumno */}
            <div>
              <h3 className="text-lg font-semibold text-indigo-900 border-b border-slate-200 pb-2 mb-6">1. Datos del Alumno</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nombre *</label>
                  <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800" 
                    placeholder="Ej: Laura" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Apellidos *</label>
                  <input type="text" name="apellidos" required value={formData.apellidos} onChange={handleChange}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Fecha de Nacimiento *</label>
                  <input type="date" name="fechaNacimiento" required value={formData.fechaNacimiento} onChange={handleChange}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800" />
                </div>
              </div>
            </div>

            {/* Bloque 2: Datos de Contacto */}
            <div>
              <h3 className="text-lg font-semibold text-indigo-900 border-b border-slate-200 pb-2 mb-6">2. Información de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Teléfono *</label>
                  <input type="tel" name="telefono" required value={formData.telefono} onChange={handleChange}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Correo Electrónico *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800" />
                </div>
              </div>
            </div>

            {/* Casilla Menor de Edad */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
              <input 
                type="checkbox" 
                id="menorEdad" 
                checked={esMenor} 
                onChange={(e) => setEsMenor(e.target.checked)}
                className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <label htmlFor="menorEdad" className="font-medium text-slate-700 cursor-pointer">
                El alumno es menor de edad
              </label>
            </div>

            {/* Bloque 3: Datos del Tutor (Oculto por defecto) */}
            {esMenor && (
              <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 animate-fade-in">
                <h3 className="text-lg font-semibold text-indigo-900 border-b border-indigo-200 pb-2 mb-6">Datos del Padre, Madre o Tutor Legal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nombre y Apellidos del Tutor *</label>
                    <input type="text" name="tutorNombre" required={esMenor} value={formData.tutorNombre} onChange={handleChange}
                      className="w-full p-3 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">DNI / NIE *</label>
                    <input type="text" name="tutorDni" required={esMenor} value={formData.tutorDni} onChange={handleChange}
                      className="w-full p-3 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Teléfono de Contacto (Tutor) *</label>
                    <input type="tel" name="tutorTelefono" required={esMenor} value={formData.tutorTelefono} onChange={handleChange}
                      className="w-full p-3 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 bg-white" />
                  </div>
                </div>
              </div>
            )}

            {/* Bloque 4: Preferencias Musicales */}
            <div>
              <h3 className="text-lg font-semibold text-indigo-900 border-b border-slate-200 pb-2 mb-6">3. Preferencias Musicales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Instrumento de Interés</label>
                  <select name="instrumento" value={formData.instrumento} onChange={handleChange}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 bg-white"
                  >
                    <option value="">Aún no lo sé / Música y Movimiento</option>
                    <optgroup label="Viento Madera">
                      <option value="Flauta Travesera">Flauta Travesera</option>
                      <option value="Clarinete">Clarinete</option>
                      <option value="Saxofón">Saxofón</option>
                      <option value="Oboe">Oboe</option>
                    </optgroup>
                    <optgroup label="Viento Metal">
                      <option value="Trompeta">Trompeta</option>
                      <option value="Trompa">Trompa</option>
                      <option value="Trombón">Trombón</option>
                      <option value="Bombardino/Tuba">Bombardino / Tuba</option>
                    </optgroup>
                    <optgroup label="Percusión">
                      <option value="Percusion">Percusión</option>
                    </optgroup>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">¿Tienes experiencia previa?</label>
                  <select name="experiencia" value={formData.experiencia} onChange={handleChange}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 bg-white"
                  >
                    <option value="No">No, empiezo desde cero</option>
                    <option value="Si">Sí, ya sé algo de música</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Observaciones (Opcional)</label>
                  <textarea name="observaciones" rows={3} value={formData.observaciones} onChange={handleChange}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 resize-none"
                    placeholder="Cuéntanos si tienes disponibilidad horaria limitada, necesidades especiales, etc."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Bloque 5: Protección de Datos */}
            <div className="mt-8 border-t border-slate-200 pt-8">
              <h3 className="text-lg font-semibold text-indigo-900 mb-4">4. Protección de Datos</h3>
              
              {/* Cajita con scroll para el texto largo */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 h-32 overflow-y-auto mb-4 custom-scrollbar">
                <p className="font-bold mb-2">INFORMACIÓN BÁSICA SOBRE PROTECCIÓN DE DATOS:</p>
                <p className="mb-2">
                  <strong>Responsable:</strong> Agrupación Musical Isorana.<br/>
                  <strong>Finalidad:</strong> Gestión de la preinscripción en la academia de música, contacto para formalizar la matrícula y envío de información relevante sobre el curso.<br/>
                  <strong>Legitimación:</strong> Consentimiento del interesado o su tutor legal.<br/>
                  <strong>Destinatarios:</strong> No se cederán datos a terceros, salvo obligación legal.<br/>
                  <strong>Derechos:</strong> Tienes derecho a acceder, rectificar y suprimir los datos, así como otros derechos, dirigiéndote a nuestro correo electrónico.
                </p>
                
                <div className="mt-4">
                  PROTECCIÓN DE DATOS PERSONALES
                  De conformidad con lo dispuesto en el Reglamento (UE) 2016/679 General de Protección de Datos (RGPD) y en la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), se informa de lo siguiente:
                  Responsable del tratamiento: Agrupación Musical Isorana AMUSIC, con CIF G38047940.
                  Finalidad: Los datos personales facilitados mediante este formulario serán tratados con la finalidad de gestionar la preinscripción, inscripción y participación del alumno/a en las actividades formativas de la Academia de la Agrupación Musical Isorana AMUSIC, así como para realizar las comunicaciones necesarias relacionadas con la organización de las clases, horarios, actividades y funcionamiento de la academia.
                  Legitimación: El tratamiento de los datos se basa en la aplicación de medidas precontractuales solicitadas por la persona interesada y, en su caso, en la posterior relación derivada de la inscripción del alumno/a, así como en el cumplimiento de las obligaciones legales aplicables.
                  Conservación: Los datos se conservarán durante el tiempo necesario para gestionar la preinscripción y, en caso de formalizarse la matrícula, durante el tiempo que se mantenga la relación con la Academia y posteriormente durante los plazos exigidos legalmente.
                  Destinatarios: Los datos no serán cedidos a terceros salvo obligación legal o cuando sea necesario para la correcta prestación de los servicios, pudiendo tener acceso a ellos los proveedores que actúen como encargados del tratamiento de la Agrupación.
                  Derechos: La persona interesada podrá ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y, cuando proceda, portabilidad de sus datos, dirigiéndose a Agrupación Musical Isorana AMUSIC a través del correo electrónico agrupacionmusicalisorana@gmail.com
                  Asimismo, podrá presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).
                  En el caso de alumnos/as menores de edad, los datos serán facilitados por su padre, madre o representante legal cuando corresponda.
                </div>
              </div>
              
              {/* Casilla obligatoria */}
              <div className="flex items-start gap-3 bg-indigo-50/30 p-4 rounded-xl border border-indigo-50">
                <input 
                  type="checkbox" 
                  id="aceptaPrivacidad" 
                  required
                  checked={aceptaPrivacidad} 
                  onChange={(e) => setAceptaPrivacidad(e.target.checked)}
                  className="mt-1 w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer flex-shrink-0"
                />
                <label htmlFor="aceptaPrivacidad" className="text-sm font-medium text-slate-700 cursor-pointer">
                  He leído y acepto la política de privacidad y el tratamiento de mis datos personales (y los del menor a mi cargo, si procede) para la gestión de esta solicitud. *
                </label>
              </div>
            </div>

            <button type="submit" 
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg mt-4"
            >
              Enviar Preinscripción
            </button>
          </form>
        </div>
      </section>

      {/* --- SECCIÓN: CTA (Llamada a la acción alternativa) --- */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Tienes alguna duda antes de apuntarte?</h2>
          <p className="text-slate-400 mb-8">
            Si prefieres hablar con nosotros primero, no dudes en contactarnos directamente.
          </p>
          <Link 
            href="/contacto" 
            className="inline-block px-6 py-3 border-2 border-white text-white font-medium rounded-xl hover:bg-white hover:text-slate-900 transition-all"
          >
            Ir a Contacto
          </Link>
        </div>
      </section>

    </main>
  );
}