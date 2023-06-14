import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({
    type: [String],
    format: 'binary',
    required: true,
    nullable: false,
  })
  files: Express.Multer.File[];
}
