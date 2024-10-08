import { Module } from "@nestjs/common";
import { TicketHandlerService } from "./ticket_handler.service";
import { ConfigService } from "@nestjs/config";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [TicketHandlerService, ConfigService]
})
export class TicketHandlerModule{}