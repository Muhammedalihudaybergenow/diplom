import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderStatusEnum } from '../enum/order.enum';

export class OrderQueryDto {
  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNumberString()
  @IsNotEmpty()
  limit: number;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNumberString()
  @IsNotEmpty()
  skip: number;

  @ApiProperty({
    type: String,
    required: false,
    nullable: false,
  })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNumberString()
  @IsNotEmpty()
  startDate: number;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNumberString()
  @IsNotEmpty()
  endDate: number;

  @ApiProperty({
    type: 'enum',
    required: false,
    nullable: false,
    enum: OrderStatusEnum,
  })
  @IsEnum(OrderStatusEnum)
  @IsOptional()
  status: OrderStatusEnum;

  @ApiProperty({
    type: 'enum',
    required: true,
    nullable: false,
    enum: ['id', 'orderNo', 'updatedAt'],
  })
  @IsNotEmpty()
  @IsIn(['id', 'orderNo', 'updatedAt'])
  orderBy: string;

  @ApiProperty({
    type: 'enum',
    required: true,
    nullable: false,
    enum: ['ASC', 'DESC'],
  })
  orderDirection: 'ASC' | 'DESC';
}
