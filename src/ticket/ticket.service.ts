import { PrismaService } from "../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { GetTicketDto } from "./dto/get-ticket.dto";
import { NotFoundException } from "@nestjs/common";


@Injectable()
export class TicketService{
  constructor(
    private prisma: PrismaService
  ){}

  async getAllTickets(){
    return this.prisma.ticket.findMany()
  }

  async getTicketsByServiceId(payload_data: GetTicketDto){

    let service_id = payload_data.service_id
    let ticket = await this.prisma.ticket.findMany({where: {service_id: Number(service_id)}})
    if (!ticket){
      throw new NotFoundException ("Tickets Not Found")
    }
    return ticket;
  }


  async createTicket(payload_data: CreateTicketDto){

    const service = await this.prisma.service.findUnique({where: {service_name: payload_data.service_name}})
    if (!service){
      throw new NotFoundException ("Service Not Found")
    }

    const data = {
      completed: false,
      service_id: service.service_id
    }
    return this.prisma.ticket.create({data})
  }

}