import { ApiProperty } from "@nestjs/swagger";

export class CreateLanguageDto {

    @ApiProperty({
        type: String,
        required:true,
        nullable: false
    })
    name: string;
}
