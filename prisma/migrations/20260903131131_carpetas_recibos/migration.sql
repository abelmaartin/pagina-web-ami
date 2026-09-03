/*
  Warnings:

  - You are about to drop the column `coleccion` on the `Recibo` table. All the data in the column will be lost.
  - Added the required column `coleccionId` to the `Recibo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recibo" DROP COLUMN "coleccion",
ADD COLUMN     "coleccionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ColeccionRecibos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ColeccionRecibos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ColeccionRecibos_nombre_key" ON "ColeccionRecibos"("nombre");

-- AddForeignKey
ALTER TABLE "Recibo" ADD CONSTRAINT "Recibo_coleccionId_fkey" FOREIGN KEY ("coleccionId") REFERENCES "ColeccionRecibos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
