import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateProductNameDto } from './create-product-name.dto';
import { Type } from 'class-transformer';

export class CreateProductDto {

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    type: Number,
    required:true,
    nullable:false
  })
  @IsNotEmpty()
  @IsNumber()
  amount:number;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  brandId: number;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    type: [CreateProductNameDto],
    required:false,
    nullable: false,
  })
  @Type(()=>CreateProductNameDto)
  @ValidateNested({
    each:true
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  names:CreateProductNameDto[];
}
