-- CreateTable
CREATE TABLE "Service" (
    "service_id" SERIAL NOT NULL,
    "service_name" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("service_id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "ticket_id" SERIAL NOT NULL,
    "service_id" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticket_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_service_name_key" ON "Service"("service_name");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;
