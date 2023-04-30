import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
    nullable: false,
  })
  image: Express.Multer.File;

  @ApiProperty({
    type: String,
    required: false,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
