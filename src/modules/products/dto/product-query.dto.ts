import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductQueryDto {
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
  @IsNotEmpty()
  @IsNumberString()
  skip: number;

  @ApiProperty({
    type: [Number],
    required: false,
    nullable: false,
  })
  @IsOptional()
  brandIds: number[];

  @ApiProperty({
    type: [Number],
    required: false,
    nullable: false,
  })
  @IsOptional()
  categoryIds: number[];

  @ApiProperty({
    type: String,
    required: false,
    nullable: false,
  })
  @IsOptional()
  @IsString()
  search: string;
}
