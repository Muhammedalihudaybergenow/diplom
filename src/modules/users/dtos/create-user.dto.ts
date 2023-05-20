import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  username: string;
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  password: string;
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  status: string;

  @ApiProperty({
    type: [Number],
    required: true,
    nullable: false,
  })
  roleIds: number[];
}
