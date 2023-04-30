import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { PermissionEntity } from '../../permissions/entities/permission.entity';

@Entity({
  name: 'roles',
})
export class RoleEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToMany(() => UserEntity, (users) => users.roles)
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: UserEntity[];

  @ManyToMany(() => PermissionEntity, (permissions) => permissions.roles)
  permissions: PermissionEntity[];
  constructor(role?: Partial<RoleEntity>) {
    Object.assign(this, role);
  }
}
