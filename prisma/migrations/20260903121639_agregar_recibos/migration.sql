-- CreateTable
CREATE TABLE "Recibo" (
    "id" SERIAL NOT NULL,
    "concepto" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "destinatario" TEXT NOT NULL,
    "importe" DOUBLE PRECISION NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "fechaEmision" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notas" TEXT,

    CONSTRAINT "Recibo_pkey" PRIMARY KEY ("id")
);
