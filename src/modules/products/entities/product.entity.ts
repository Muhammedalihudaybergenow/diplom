import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { BrandEntity } from '../brands/entities/brand.entity';
import { CategoryEntity } from '../categories/entities/category.entity';
import { ImageEntity } from './image.entity';
import {ProductNameEntity} from './product-name.entity'

@Entity({
  name: 'products',
})
export class ProductEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

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

  @OneToMany(()=>ProductNameEntity,(names)=>names.product,{cascade:true})
  names: ProductNameEntity[];

  @ManyToOne(() => CategoryEntity, (category) => category.id)
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
  })
  category: CategoryEntity;
}
