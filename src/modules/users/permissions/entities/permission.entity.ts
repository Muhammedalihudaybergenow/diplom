import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from '../../roles/entities/role.entity';

@Entity({
  name: 'permissions',
})
export class PermissionEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
    nullable: false,
    length: '250',
    unique: true,
  })
  name: string;

  @ManyToMany(() => RoleEntity, (roles) => roles.permissions)
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: RoleEntity[];
}
