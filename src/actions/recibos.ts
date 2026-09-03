'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// --- CARPETAS / COLECCIONES ---
export async function obtenerColecciones() {
  try {
    return await prisma.coleccionRecibos.findMany({
      include: { _count: { select: { recibos: true } } }, // Trae el número de recibos que tiene dentro
      orderBy: { creadoEn: 'desc' }
    });
  } catch (error) {
    return [];
  }
}

export async function crearColeccion(nombre: string) {
  try {
    await prisma.coleccionRecibos.create({ data: { nombre } });
    revalidatePath('/admin/recibos');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error al crear la colección' };
  }
}

export async function borrarColeccion(id: number) {
  try {
    await prisma.coleccionRecibos.delete({ where: { id } });
    revalidatePath('/admin/recibos');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function duplicarColeccion(coleccionIdAntigua: number, nuevoNombre: string, nuevoConcepto: string) {
  try {
    const recibosAntiguos = await prisma.recibo.findMany({ where: { coleccionId: coleccionIdAntigua } });
    
    // Creamos la carpeta nueva
    const nuevaCarpeta = await prisma.coleccionRecibos.create({ data: { nombre: nuevoNombre } });

    // Preparamos los recibos copiados (mismo destinatario y músico, pero estado PENDIENTE)
    const nuevosRecibos = recibosAntiguos.map(r => ({
      concepto: nuevoConcepto,
      tipo: r.tipo,
      destinatario: r.destinatario,
      importe: r.importe,
      estado: 'PENDIENTE',
      notas: r.notas,
      musicoResponsable: r.musicoResponsable,
      coleccionId: nuevaCarpeta.id
    }));

    await prisma.recibo.createMany({ data: nuevosRecibos });
    revalidatePath('/admin/recibos');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'No se pudo duplicar' };
  }
}

// --- RECIBOS ---
export async function obtenerInfoCarpeta(coleccionId: number) {
  try {
    const carpeta = await prisma.coleccionRecibos.findUnique({ where: { id: coleccionId } });
    const recibos = await prisma.recibo.findMany({
      where: { coleccionId },
      orderBy: { fechaEmision: 'desc' }
    });
    return { carpeta, recibos };
  } catch (error) {
    return { carpeta: null, recibos: [] };
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
        coleccionId: parseInt(data.coleccionId),
      }
    });
    revalidatePath(`/admin/recibos/${data.coleccionId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error al guardar' };
  }
}

export async function actualizarEstadoRecibo(id: number, estado: string, coleccionId: number) {
  try {
    await prisma.recibo.update({ where: { id }, data: { estado } });
    revalidatePath(`/admin/recibos/${coleccionId}`);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function eliminarRecibo(id: number, coleccionId: number) {
  try {
    await prisma.recibo.delete({ where: { id } });
    revalidatePath(`/admin/recibos/${coleccionId}`);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}