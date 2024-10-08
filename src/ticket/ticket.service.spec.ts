import { PrismaService } from "../prisma/prisma.service"
import { TicketService } from "./ticket.service"
import { Test } from "@nestjs/testing"

describe('TicketService', () => {
  let service: TicketService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TicketService,
        {
          provide: PrismaService,
          useValue: {
            ticket: {
              findMany: jest.fn().mockResolvedValue([
                {
                  ticket_id: 1,
                  service_id: 1,
                  completed: false
                },
              ]),

              create: jest.fn().mockResolvedValue([
                {
                  ticket_id: 2,
                  service_id: 2,
                  completed: false
                },
              ]),
            },

            service: {
              findUnique: jest.fn().mockResolvedValue(
                {
                  service_id: 2,
                  service_name: "get_cash"
                },
              ),
            }

          }
        }

     
      ]
    }).compile()

    service = module.get<TicketService>(TicketService)
  })

  it('should return all tickets', async () => {
    expect(await service.getAllTickets()).toEqual([
      {
        ticket_id: 1,
        service_id: 1,
        completed: false
      },
    ])
  })

  it('should return tickets by service_id', async () => {
    expect(await service.getTicketsByServiceId({"service_id": 1})).toEqual([
      {
        ticket_id: 1,
        service_id: 1,
        completed: false
      }
      
    ])
  })


  it('should create a ticket by service_name', async () => {
    expect(await service.createTicket({"service_name": "get_cash"})).toEqual([
      {
        ticket_id: 2,
        service_id: 2,
        completed: false
      }
      
    ])
  })


})