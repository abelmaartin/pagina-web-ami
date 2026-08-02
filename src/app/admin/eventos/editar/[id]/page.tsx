import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect, notFound } from 'next/navigation';

export default async function EditarEvento({
  params,
}: {
  params: Promise<{ id: string }>; // En las nuevas versiones de Next.js, params es asíncrono
}) {
  // 1. Obtenemos el ID de la URL y lo pasamos a número
  const { id } = await params;
  const eventoId = Number(id);

  // 2. Buscamos el evento exacto en la base de datos
  const evento = await prisma.evento.findUnique({
    where: { id: eventoId },
  });

  // Si alguien pone un ID que no existe en la URL, mostramos página de error 404
  if (!evento) {
    notFound();
  }

  // 3. Formateamos la fecha para que el input type="datetime-local" la entienda (YYYY-MM-DDThh:mm)
  const year = evento.fecha.getFullYear();
  const month = String(evento.fecha.getMonth() + 1).padStart(2, '0');
  const day = String(evento.fecha.getDate()).padStart(2, '0');
  const hours = String(evento.fecha.getHours()).padStart(2, '0');
  const minutes = String(evento.fecha.getMinutes()).padStart(2, '0');
  const fechaFormateada = `${year}-${month}-${day}T${hours}:${minutes}`;

  // 4. Server Action: La función que actualiza los datos
  async function actualizarEvento(formData: FormData) {
    'use server';
    
    const titulo = formData.get('titulo') as string;
    const fechaString = formData.get('fecha') as string;
    const lugar = formData.get('lugar') as string;
    const tipo = formData.get('tipo') as string;
    const descripcion = formData.get('descripcion') as string;
    const color = formData.get('color') as string;

    // Usamos .update() de Prisma en lugar de .create()
    await prisma.evento.update({
      where: { id: eventoId },
      data: {
        titulo,
        fecha: new Date(fechaString),
        lugar,
        tipo,
        descripcion,
        color: color === "" ? null : color,
      },
    });

    // Limpiamos las cachés y volvemos a la tabla
    revalidatePath('/admin/eventos');
    revalidatePath('/eventos');
    redirect('/admin/eventos');
  }

  return (
    <main className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Editar Evento</h1>
        <a href="/admin/eventos" className="text-gray-500 hover:text-gray-800 underline">Volver</a>
      </div>
      
      <form action={actualizarEvento} className="flex flex-col gap-5 bg-white p-8 rounded-xl shadow-lg text-gray-800">
        
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo" className="font-semibold">Título del evento</label>
          <input 
            type="text" 
            id="titulo" 
            name="titulo" 
            defaultValue={evento.titulo}
            required 
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
              defaultValue={fechaFormateada}
              required 
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tipo" className="font-semibold">Tipo de Evento</label>
            <select 
              id="tipo" 
              name="tipo" 
              defaultValue={evento.tipo}
              required
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
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
            defaultValue={evento.lugar}
            required 
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="descripcion" className="font-semibold">Descripción</label>
          <textarea 
            id="descripcion" 
            name="descripcion" 
            rows={3}
            defaultValue={evento.descripcion}
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="color" className="font-semibold text-gray-700">Color destacado</label>
          <select 
            id="color" 
            name="color" 
            defaultValue={evento.color || ""}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="">Por defecto (Blanco/Gris)</option>
            <option value="bg-indigo-50 border-indigo-200 text-indigo-900">Azul Índigo (Institucional)</option>
            <option value="bg-red-50 border-red-200 text-red-900">Rojo (Importante/Concierto)</option>
            <option value="bg-green-50 border-green-200 text-green-900">Verde (Academia)</option>
            <option value="bg-amber-50 border-amber-200 text-amber-900">Ámbar (Ensayo Especial)</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="mt-4 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
        >
          Guardar Cambios
        </button>
      </form>
    </main>
  );
}