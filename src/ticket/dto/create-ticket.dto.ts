import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTicketDto {

  @IsString()
  @ApiProperty({
    example: "get_cash",
    required: true
  })
  service_name: string;

}