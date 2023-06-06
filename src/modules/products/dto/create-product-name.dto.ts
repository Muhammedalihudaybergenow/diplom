import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateProductNameDto {

    @ApiProperty({
        type: Number,
        required:true,
        nullable:false
    })
    @IsNumber()
    @IsNotEmpty()
    languageId: number;

    @ApiProperty({
        type: String,
        required:true,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    name: string;
}