'use server';

import prisma from '@/lib/prisma';
import { Resend } from 'resend';

// Inicializamos Resend
const resend = new Resend(process.env.RESEND_API_KEY_INSCRIPCION);

export async function registrarPreinscripcion(data: any) {
  try {
    // 1. Guardar en la base de datos de Prisma
    await prisma.preinscripcion.create({
      data: {
        nombre: data.nombre,
        apellidos: data.apellidos,
        fechaNacimiento: data.fechaNacimiento,
        telefono: data.telefono,
        email: data.email,
        esMenor: data.esMenor,
        tutorNombre: data.tutorNombre || null,
        tutorDni: data.tutorDni || null,
        tutorTelefono: data.tutorTelefono || null,
        instrumento: data.instrumento || null,
        experiencia: data.experiencia || null,
        observaciones: data.observaciones || null,
      }
    });

    // 2. Enviar el correo de aviso a la directiva
    await resend.emails.send({
      from: 'Academia AMI <academia@agrupmusisorana.com>',
      to: 'academia@agrupmusisorana.com',
      subject: `🎵 Nueva Inscripción: ${data.nombre} ${data.apellidos}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4f46e5;">Nueva solicitud de ingreso a la academia</h2>
          <p>Se ha recibido una nueva preinscripción desde la página web. Aquí tienes los detalles básicos:</p>
          
          <ul style="line-height: 1.6;">
            <li><strong>Alumno:</strong> ${data.nombre} ${data.apellidos}</li>
            <li><strong>Teléfono:</strong> ${data.telefono}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Instrumento de interés:</strong> ${data.instrumento || 'No especificado'}</li>
            <li><strong>¿Menor de edad?:</strong> ${data.esMenor ? 'Sí' : 'No'}</li>
            ${data.esMenor ? `<li><strong>Tutor legal:</strong> ${data.tutorNombre} (${data.tutorTelefono})</li>` : ''}
          </ul>
          
          <p><strong>Observaciones:</strong><br/> ${data.observaciones || 'Ninguna'}</p>
        </div>
      `
    });

    return { success: true };
  } catch (error) {
    console.error('Error al procesar preinscripción:', error);
    return { success: false, error: 'Hubo un error al procesar tu solicitud.' };
  }
}

// ... (código que ya tienes de registrarPreinscripcion)

// Obtener todas las preinscripciones ordenadas de más nuevas a más antiguas
export async function obtenerPreinscripciones() {
  try {
    const inscripciones = await prisma.preinscripcion.findMany({
      orderBy: { fechaSolicitud: 'desc' }
    });
    return inscripciones;
  } catch (error) {
    console.error('Error al obtener preinscripciones:', error);
    return [];
  }
}

// Cambiar el estado (ej: de PENDIENTE a CONTACTADO)
export async function actualizarEstadoInscripcion(id: number, nuevoEstado: string) {
  try {
    await prisma.preinscripcion.update({
      where: { id },
      data: { estado: nuevoEstado }
    });
    return { success: true };
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    return { success: false, error: 'No se pudo actualizar el estado' };
  }
}

// Eliminar una solicitud
export async function eliminarPreinscripcion(id: number) {
  try {
    await prisma.preinscripcion.delete({
      where: { id }
    });
    return { success: true };
  } catch (error) {
    console.error('Error al eliminar:', error);
    return { success: false, error: 'No se pudo eliminar' };
  }
}