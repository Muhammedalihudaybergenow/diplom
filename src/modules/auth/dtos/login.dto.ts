import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
