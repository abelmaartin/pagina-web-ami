import prisma from '@/lib/prisma';
import GaleriaCliente from './GaleriaCliente';

export default async function GaleriaPage() {
  // 1. Pedimos los álbumes reales con sus respectivas fotos y conteos desde Prisma
  const albumesDesdeDb = await prisma.album.findMany({
    orderBy: { fecha: 'desc' },
    include: {
      fotos: true, // Traemos todas las fotos asociadas a cada álbum
    },
  });

  // 2. Formateamos los datos para que encajen perfectamente con la estructura visual que te gusta
  const albumes = albumesDesdeDb.map((album) => ({
    id: album.id,
    titulo: album.titulo,
    categoria: "Conciertos", // Puedes adaptarlo si añades categorías en tu base de datos
    fecha: album.fecha.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' }),
    portadaUrl: album.portadaUrl, // La foto de portada real de la nube
    fotos: album.fotos.map((foto) => ({
      id: foto.id,
      url: foto.url, // La URL real de Vercel Blob
    })),
  }));

  // Renderizamos el componente interactivo pasándole los datos reales
  return <GaleriaCliente albumes={albumes} />;
}