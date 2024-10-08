import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TicketModule } from './ticket/ticket.module';
import { LoggerMiddleWare } from './ticket/ticket.middleware';
import { TicketHandlerModule } from './ticket_handler/ticket_handler.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TicketModule, TicketHandlerModule, ScheduleModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes("*")
  }
}
