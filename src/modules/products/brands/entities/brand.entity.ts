import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'brands',
})
export class BrandEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: '50',
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    name: 'link',
    type: 'varchar',
    length: '300',
    nullable: false,
  })
  link: string;

  constructor(brand?: Partial<BrandEntity>) {
    Object.assign(this, brand);
  }
}
