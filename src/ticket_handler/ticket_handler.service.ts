import { SchedulerRegistry } from "@nestjs/schedule";
import { PrismaService } from "../prisma/prisma.service";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TicketHandlerService implements OnModuleInit{
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry
  ){}

  // Initializing ticket handler
  // Launching every S seconds (configure in .env file)
  onModuleInit() {
    
    console.log(`Ticket handler has been started`);

    const interval = setInterval(() => {
      this.ticket_process()
    }, 1000 * this.configService.get('SECONDS_FOR_ONE_SERVICE'))

    this.schedulerRegistry.addInterval('ticket_handler_interval', interval)
  }

  
  async ticket_process(){
    let current_ticket = await this.prisma.ticket.findFirst({where: {completed: false}})

    // Ticket to process was found
    if (current_ticket){
      let updated_ticket = await this.prisma.ticket.update({
        where: {ticket_id: current_ticket.ticket_id},
        data:{completed: true}
      })

      // Ticket successfully completed
      if (updated_ticket.completed){
        console.log(`Visit ${current_ticket.ticket_id} completed`)
        let next_ticket = await this.prisma.ticket.findFirst({where: {completed: false}})
        if (next_ticket){
          console.log(`Next visitor: ${next_ticket.ticket_id}`)
        }
      } else {
        console.log("Sorry, something went wrong...")
      }

    } else {
      // console.log("Not found ticket to process")
    }
    
  }



}  
