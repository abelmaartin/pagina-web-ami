import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default function AdminEventos() {
  async function crearEvento(formData: FormData) {
    'use server';
    
    // 1. Extraemos TODOS los datos, incluyendo los nuevos
    const titulo = formData.get('titulo') as string;
    const fechaString = formData.get('fecha') as string;
    const lugar = formData.get('lugar') as string;
    const tipo = formData.get('tipo') as string;
    const descripcion = formData.get('descripcion') as string;
    const color = formData.get('color') as string;

    const fecha = new Date(fechaString);

    // 2. Guardamos en la base de datos ajustado a tu esquema
    await prisma.evento.create({
      data: {
        titulo,
        fecha,
        lugar,
        tipo,
        descripcion,
        // Si no selecciona color, lo dejamos como null (tu esquema lo permite con String?)
        color: color === "" ? null : color, 
      },
    });

    revalidatePath('/eventos');
    redirect('/admin/eventos');
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Añadir Nuevo Evento</h1>
      
      <form action={crearEvento} className="flex flex-col gap-5 bg-white p-8 rounded-xl shadow-lg text-gray-800">
        
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo" className="font-semibold">Título del evento</label>
          <input 
            type="text" 
            id="titulo" 
            name="titulo" 
            required 
            placeholder="Ej: Concierto de Santa Cecilia"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="fecha" className="font-semibold">Fecha y Hora</label>
            <input 
              type="datetime-local" 
              id="fecha" 
              name="fecha" 
              required 
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tipo" className="font-semibold">Tipo de Evento</label>
            <select 
              id="tipo" 
              name="tipo" 
              required
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="">Selecciona un tipo...</option>
              <option value="Concierto">Concierto</option>
              <option value="Procesión">Procesión</option>
              <option value="Ensayo">Ensayo</option>
              <option value="Academia">Academia</option>
              <option value="Pasacalles">Pasacalles</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="lugar" className="font-semibold">Lugar</label>
          <input 
            type="text" 
            id="lugar" 
            name="lugar" 
            required 
            placeholder="Ej: Auditorio Municipal / Plaza del Pueblo"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="descripcion" className="font-semibold">Descripción</label>
          <textarea 
            id="descripcion" 
            name="descripcion" 
            rows={3}
            required
            placeholder="Detalles del repertorio, hora de encuentro de los músicos, etc."
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="color" className="font-semibold text-gray-700">Color destacado (Opcional)</label>
          <select 
            id="color" 
            name="color" 
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="">Por defecto (Blanco/Gris)</option>
            <option value="bg-indigo-50 border-indigo-200 text-indigo-900">Azul Índigo (Procesión)</option>
            <option value="bg-red-50 border-red-200 text-red-900">Rojo (Concierto)</option>
            <option value="bg-green-50 border-green-200 text-green-900">Verde (Academia)</option>
            <option value="bg-amber-50 border-amber-200 text-amber-900">Ámbar (Eventos Especiales)</option>
          </select>
          <p className="text-sm text-gray-500">Esto cambiará el color del fondo de la tarjeta en la web.</p>
        </div>

        <button 
          type="submit" 
          className="mt-4 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
        >
          Guardar Evento en la Base de Datos
        </button>
      </form>
    </main>
  );
}