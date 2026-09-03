'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function obtenerRecibos() {
  try {
    return await prisma.recibo.findMany({
      orderBy: { fechaEmision: 'desc' }
    });
  } catch (error) {
    console.error('Error al obtener recibos:', error);
    return [];
  }
}

export async function crearRecibo(data: any) {
  try {
    await prisma.recibo.create({
      data: {
        concepto: data.concepto,
        tipo: data.tipo,
        destinatario: data.destinatario,
        importe: parseFloat(data.importe),
        estado: data.estado || 'PENDIENTE',
        notas: data.notas || null,
        musicoResponsable: data.musicoResponsable || null,
        coleccion: data.coleccion || null,
      }
    });
    revalidatePath('/admin/recibos');
    return { success: true };
  } catch (error) {
    console.error('Error al crear recibo:', error);
    return { success: false, error: 'No se pudo crear el recibo' };
  }
}

export async function actualizarEstadoRecibo(id: number, estado: string) {
  try {
    await prisma.recibo.update({
      where: { id },
      data: { estado }
    });
    revalidatePath('/admin/recibos');
    return { success: true };
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    return { success: false, error: 'No se pudo actualizar el estado' };
  }
}

export async function eliminarRecibo(id: number) {
  try {
    await prisma.recibo.delete({ where: { id } });
    revalidatePath('/admin/recibos');
    return { success: true };
  } catch (error) {
    console.error('Error al eliminar recibo:', error);
    return { success: false, error: 'No se pudo eliminar el recibo' };
  }
}

// NUEVA FUNCIÓN: Renovar una colección entera
export async function renovarColeccion(coleccionAntigua: string, nuevaColeccion: string, nuevoConcepto: string) {
  try {
    // 1. Buscamos todos los recibos de la colección antigua
    const recibosAntiguos = await prisma.recibo.findMany({
      where: { coleccion: coleccionAntigua }
    });

    if (recibosAntiguos.length === 0) {
      return { success: false, error: 'No se encontraron recibos en esa colección' };
    }

    // 2. Preparamos los nuevos datos (mismo importe y destinatario, pero nueva colección, nuevo concepto y PENDIENTE)
    const nuevosRecibos = recibosAntiguos.map((recibo) => ({
      concepto: nuevoConcepto,
      tipo: recibo.tipo,
      destinatario: recibo.destinatario,
      importe: recibo.importe,
      estado: 'PENDIENTE', // Siempre nacen pendientes
      notas: recibo.notas,
      musicoResponsable: recibo.musicoResponsable,
      coleccion: nuevaColeccion,
    }));

    // 3. Los insertamos todos de golpe
    await prisma.recibo.createMany({
      data: nuevosRecibos
    });

    revalidatePath('/admin/recibos');
    return { success: true, cantidad: nuevosRecibos.length };
  } catch (error) {
    console.error('Error al renovar colección:', error);
    return { success: false, error: 'Ocurrió un error al duplicar la colección' };
  }
}