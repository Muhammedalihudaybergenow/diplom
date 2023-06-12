import { ProductEntity } from "src/modules/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from './order.entity';

@Entity({
  name: 'order_items',
})
export class OrderItemEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'amount',
    type: 'integer',
    nullable: false,
  })
  amount: number;

  @Column({
    name: 'price',
    type: 'integer',
    nullable: false,
  })
  price: number;

  @Column({
    name: 'product_id',
    type: 'integer',
    nullable: false,
  })
  productId: number;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  product: ProductEntity;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'id',
  })
  order: OrderEntity;

  constructor(item?: Partial<OrderItemEntity>) {
    Object.assign(this, item);
  }
}