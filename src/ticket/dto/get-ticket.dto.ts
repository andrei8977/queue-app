import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetTicketDto {

  @IsNumber()
  @ApiProperty({
    example: 1,
    required: true
  })
  service_id: number;

}