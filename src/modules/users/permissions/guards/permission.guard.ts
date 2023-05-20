import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserEntity } from '../../entities/user.entity';
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const user: UserEntity = request.user;
    const permissions = this.reflector.get<string[]>(
      'permission',
      context.getHandler(),
    );
    const userRolePermissions = this.userPermissions(user);
    let includePermission = false;
    userRolePermissions.forEach((perm) => {
      if (permissions.includes(perm)) {
        includePermission = true;
      }
    });
    return includePermission;
  }

  private userPermissions(user: UserEntity) {
    const permissions: string[] = [];
    user.roles.forEach((role) => {
      role.permissions.forEach((permission) => {
        if (!permissions.includes(permission.name)) {
          permissions.push(permission.name);
        }
      });
    });
    return permissions;
  }
}
