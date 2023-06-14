import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { type } from 'os';

export class QueryFilesDto {
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
    type: 'enum',
    required: true,
    nullable: false,
    enum: ['id', 'size'],
  })
  @IsIn(['id', 'size'])
  @IsNotEmpty()
  orderBy: string;

  @ApiProperty({
    type: 'enum',
    enum: ['ASC', 'DESC'],
    required: true,
    nullable: false,
  })
  @IsIn(['ASC', 'DESC'])
  @IsNotEmpty()
  orederDirections: 'ASC' | 'DESC';
}
