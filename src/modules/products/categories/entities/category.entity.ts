import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity({
  name: 'categories',
})
@Tree('closure-table', {
  ancestorColumnName: () => 'ancestor_id',
  descendantColumnName: () => 'descendant_id',
  closureTableName: 'categories',
})
export class CategoryEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: '300',
    nullable: false,
  })
  name: string;

  @TreeParent({ onDelete: 'CASCADE' })
  parent: CategoryEntity;

  @TreeChildren()
  children: CategoryEntity[];

  constructor(category?: Partial<CategoryEntity>) {
    Object.assign(this, category);
  }
}
