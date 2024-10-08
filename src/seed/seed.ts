import { PrismaClient } from "@prisma/client";
export class CreateSeed {

  // deleting all tickets, creating initial services and tickets
  async main_seed(){

    console.log("Creating initial services and tickets")

    let prisma = new PrismaClient()
    
    // deleting all tickets
    await prisma.ticket.deleteMany()

    // deleting all services
    await prisma.service.deleteMany()

    // creating initial services
    await this.create_services(prisma)

    // creating initial tickets (only after all services created)
    const services_names_for_tickets = ["get_cash", "get_cash", "put_cash", "put_cash", "transfer_cash"]

    let index = 0
    for (const my_service_name of services_names_for_tickets){
      index += 1

      const service = await prisma.service.findUnique({where: {service_name: my_service_name}})

      if (service){

        const ticket = await prisma.ticket.upsert({
          where: {ticket_id: index},
          update: {},
          create: {
            completed: false,
            service_id: service.service_id
          }
        })

        console.log("Created ticket with id: " + ticket.ticket_id)
      }
    }


  }

  // creating initial services
  async create_services(prisma){

    const service_names = ["get_cash", "put_cash", "transfer_cash"]
    let itemPromises = service_names.map(async (my_service_name) => {
      await prisma.service.upsert({
        where: {service_name: my_service_name},
        update: {},
        create: {
          service_name: my_service_name
        }
      })
    })

    await Promise.all(itemPromises);
  }

}

