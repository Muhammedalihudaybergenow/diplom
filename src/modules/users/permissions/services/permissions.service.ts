import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from '../entities/permission.entity';
import { Repository } from 'typeorm';
import { RoleEntity } from '../../roles/entities/role.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionEntity)
    private permissionRepo: Repository<PermissionEntity>,
  ) {}
  create(createPermissionDto: CreatePermissionDto) {
    const { name, roleIds } = createPermissionDto;
    const permission = new PermissionEntity();
    if (roleIds) {
      permission.roles = roleIds.map(
        (roleId) =>
          new RoleEntity({
            id: roleId,
          }),
      );
    }
    permission.name = name;
    return this.permissionRepo.save(permission);
  }

  findAll() {
    return this.permissionRepo.find();
  }

  findOne(id: number) {
    return this.permissionRepo.findOneBy({
      id,
    });
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const { name, roleIds } = updatePermissionDto;
    const permission = new PermissionEntity();
    permission.id = id;
    if (roleIds) {
      if (roleIds) {
        permission.roles = roleIds.map(
          (roleId) =>
            new RoleEntity({
              id: roleId,
            }),
        );
      }
    }
    if (name) {
      permission.name = name;
    }
    return this.permissionRepo.save(permission);
  }

  remove(id: number) {
    const permission = new PermissionEntity();
    permission.id = id;
    return this.permissionRepo.remove(permission);
  }
}
