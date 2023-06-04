import { UseGuards, applyDecorators } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { Role } from "src/modules/users/permissions/decorator/role.decorator";
import { PermissionGuard } from "src/modules/users/permissions/guards/permission.guard";

export const Permissions =(...permissions: string[])=>{
    return applyDecorators(
        ApiBearerAuth(),
        Role(...permissions),
        UseGuards(JwtAuthGuard,PermissionGuard)
    )
}