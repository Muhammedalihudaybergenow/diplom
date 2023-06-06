import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { LanguageEntity } from "src/modules/languages/entities/language.entity";

@Entity({
    name: 'products_names'
})
export class ProductNameEntity {

    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'integer'
    })
    id:number;

    @Column({
        name: 'name',
        type: 'varchar',
        length: '255',
        nullable:false
    })
    name:string;

    @Column({
        name: 'language_id',
        type: 'integer',
        nullable: false,
        select: false
    })
    languageId:number;

    @ManyToOne(()=>ProductEntity,(product)=>product.names)
    @JoinColumn({
        name: 'product_id',
        referencedColumnName: 'id'
    })
    product:ProductEntity;

    @ManyToOne(()=>LanguageEntity,(language)=>language.id)
    @JoinColumn({
        name: 'language_id',
        referencedColumnName: 'id'
    })
    langauge: LanguageEntity;

    constructor(productName?:Partial<ProductNameEntity>){
        Object.assign(this,productName);
    }
}