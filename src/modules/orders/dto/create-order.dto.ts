import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {

    @ApiProperty({
        type: Number,
        required:true,
        nullable:false
    })
    @IsNotEmpty()
    @IsNumber()
    productId:number;

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
        required:true,
        nullable:false
    })
    @IsNotEmpty()
    @IsNumber()
    price:number;

}

export class CreateOrderProductsDto {

    @ApiProperty({
        type: Number,
        required:true,
        nullable:false
    })
    @IsNotEmpty()
    @IsNumber()
    languageId:number;
    @ApiProperty({
        type:[CreateOrderDto],
        required:true,
        nullable:false
    })
    @IsNotEmpty()
    @ArrayNotEmpty()
    products: CreateOrderDto[];
    
}
