import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from '../roles/entities/role.entity';
import { OrderEntity } from 'src/modules/orders/entities/order.entity';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column({
    name: 'username',
    type: 'varchar',
    length: '20',
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: '250',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'status',
    type: 'varchar',
    length: '15',
    nullable: false,
  })
  status: string;

  @OneToMany(()=>OrderEntity,(orders)=>orders.user)
  orders:OrderEntity[];
  
  @ManyToMany(() => RoleEntity, (roles) => roles.users)
  roles: RoleEntity[];

  constructor(user?: Partial<UserEntity>) {
    Object.assign(this, user);
  }
}
