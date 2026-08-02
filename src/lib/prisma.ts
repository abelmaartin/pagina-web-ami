import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import path from 'path';
import { pathToFileURL } from 'url';

const prismaClientSingleton = () => {
  // 1. Calculamos la ruta absoluta a la base de datos de forma segura
  const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
  const dbUrl = pathToFileURL(dbPath).toString();

  // 2. ¡EL CAMBIO CLAVE! Le pasamos el objeto Config directamente al adaptador.
  // Cero dependencias de createClient, cero errores de TypeScript.
  const adapter = new PrismaLibSql({
    url: dbUrl
  });

  // 3. Devolvemos el cliente listo para funcionar
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;