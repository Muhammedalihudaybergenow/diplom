import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatusEnum } from "../enum/order.enum";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { ProductEntity } from "src/modules/products/entities/product.entity";

@Entity({
    name:'orders'
})
export class OrderEntity {

    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'integer'
    })
    id:number;

    @Column({
        name: 'order_no',
        type: 'varchar',
        nullable:false,
        unique: true
    })
    orderNo: string;

    @Column({
        name: 'status',
        type: 'enum',
        enum: OrderStatusEnum,
        nullable: false
    })
    status: OrderStatusEnum;
    @Column({
        name: 'created_at',
        type: 'integer',
        nullable:false
    })
    createdAt:number;

    @Column({
        name: 'updated_at',
        type: 'integer',
        nullable:false
    })
    updatedAt: number;

    @ManyToOne(()=>UserEntity,(user)=>user.orders)
    @JoinColumn({
        name:'user_id',
        referencedColumnName: 'id'
    })
    user:UserEntity

    constructor(order?: Partial<OrderEntity>){
        Object.assign(this,order)
    }
}
