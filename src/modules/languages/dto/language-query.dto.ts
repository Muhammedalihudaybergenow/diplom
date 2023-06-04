import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumberString } from "class-validator";

export class LanguageQueryDto {

    @ApiProperty({
        type: String,
        required:false,
        nullable: false
    })
    search: string;


    @ApiProperty({
        type: Number,
        required:true,
        nullable: false
    })
    @IsNumberString()
    @IsNotEmpty()
    limit: number;

    @ApiProperty({
        type: Number,
        required:true,
        nullable:false
    })
    @IsNotEmpty()
    @IsNumberString()
    skip: number;
    

    @ApiProperty({
        type: 'enum',
        nullable: false,
        enum: ['id','name'],
        required:true
    })
    @IsNotEmpty()
    @IsIn(['id','name'])
    orderBy:string;

    @ApiProperty({
        type: 'enum',
        enum: ['ASC','DESC'],
        nullable:false,
        required:true
    })
    @IsIn(['ASC','DESC'])
    @IsNotEmpty()
    orderDirection: 'ASC' | 'DESC'

}