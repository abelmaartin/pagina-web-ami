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
        importe: parseFloat(data.importe), // Nos aseguramos de que sea un número
        estado: data.estado || 'PENDIENTE',
        notas: data.notas || null,
      }
    });
    revalidatePath('/admin/recibos'); // Recarga la caché de la página
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