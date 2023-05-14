import { Module } from '@nestjs/common';
import { PermissionsService } from './services/permissions.service';
import { PermissionsController } from './controllers/permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionGuard } from './guards/permission.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionGuard, JwtAuthGuard],
})
export class PermissionsModule {}
