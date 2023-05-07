import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({
  name: 'images',
})
export class ImageEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'link',
    type: 'varchar',
    length: '250',
  })
  link: string;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  product: ProductEntity;

  constructor(image?: Partial<ImageEntity>) {
    Object.assign(this, image);
  }
}
