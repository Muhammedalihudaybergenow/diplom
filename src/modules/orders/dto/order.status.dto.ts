import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusEnum } from '../enum/order.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class OrderStatusDto {
  @ApiProperty({
    type: 'enum',
    required: true,
    nullable: false,
    enum: OrderStatusEnum,
  })
  @IsNotEmpty()
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;
}
