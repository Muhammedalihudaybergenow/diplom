import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: [Number],
    required: false,
    nullable: false,
  })
  @IsOptional()
  @IsInt({
    each: true,
  })
  roleIds: number[];
}
