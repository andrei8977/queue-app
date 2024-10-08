import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Res, ValidationPipe } from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { Request, Response } from "express";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { GetTicketDto } from "./dto/get-ticket.dto";

import { ApiTags } from "@nestjs/swagger";

@Controller('api/v1/ticket')
export class TicketController{

  constructor(private readonly ticketService: TicketService){}

  @Get('/get_all')
  @ApiTags('Get all tickets')
  async getAllTickets(@Req() request:Request, @Res() response:Response ){
    const result = await this.ticketService.getAllTickets()
    return response.status(200).json({
      status: "Ok!",
      message: "Successfully fetch data!",
      result: result
    })      
  }

  @Post('/get_by_service_id')
  @ApiTags('Get tickets by service_id')
  async getTicketsByServiceId(@Body(ValidationPipe) getTicketDto: GetTicketDto){
    return this.ticketService.getTicketsByServiceId(getTicketDto)
  }
  

  @Post('/create')
  @ApiTags('Create a new ticket')
  async postTicket(@Body(ValidationPipe) createTicketDto: CreateTicketDto){
    return this.ticketService.createTicket(createTicketDto)
  }

}
