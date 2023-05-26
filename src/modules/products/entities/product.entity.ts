import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { BrandEntity } from '../brands/entities/brand.entity';
import { CategoryEntity } from '../categories/entities/category.entity';
import { ImageEntity } from './image.entity';

@Entity({
  name: 'products',
})
@Tree('materialized-path')
export class ProductEntity {
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
    name: 'description',
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    name: 'brand_id',
    type: 'integer',
    nullable: false,
  })
  brandId: number;

  @Column({
    name: 'category_id',
    type: 'integer',
    nullable: false,
  })
  categoryId: number;

  @Column({
    name: 'price',
    nullable: false,
    type: 'integer',
  })
  price: number;

  @OneToMany(() => ImageEntity, (images) => images.product, { cascade: true })
  images: ImageEntity[];

  @ManyToOne(() => BrandEntity, (brand) => brand.id)
  @JoinColumn({
    name: 'brand_id',
    referencedColumnName: 'id',
  })
  brand: BrandEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.id)
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
  })
  category: CategoryEntity;
}
