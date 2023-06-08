import { ProductEntity } from "src/modules/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'order-items'
})
export class OrderItemEntity{

    @PrimaryGeneratedColumn({
        name:'id',
        type: 'integer'
    })
    id:number;

    @Column({
        name: 'name',
        type:'varchar',
        nullable:false
    })
    name: string;

    @Column({
        name: 'amount',
        type: 'integer',
        nullable:false
    })
    amount: number;

    @Column({
        name: 'price',
        type: 'integer',
        nullable:false
    })
    price: number;

    @ManyToOne(()=>ProductEntity,(product)=>product.id)
    @JoinColumn({
        name:'product_id',
        referencedColumnName: 'id'
    })
    product: ProductEntity;
}