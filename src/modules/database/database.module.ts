import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoleEntity } from '../users/roles/entities/role.entity';
import { PermissionEntity } from '../users/permissions/entities/permission.entity';
import { BrandEntity } from '../products/brands/entities/brand.entity';
import { CategoryEntity } from '../products/categories/entities/category.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { ImageEntity } from '../products/entities/image.entity';
import { LanguageEntity } from '../languages/entities/language.entity';
import { ProductNameEntity } from '../products/entities/product-name.entity';
import { OrderEntity } from '../orders/entities/order.entity';
import { OrderItemEntity } from '../orders/entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'postgres',
          database: config.get('POSTGRES_DATABASE_NAME'),
          password: config.get('POSTGRES_DATABASE_PASSWORD'),
          host: config.get('POSTGRES_DATABASE_HOST'),
          username: config.get('POSTGRES_DATABASE_USERNAME'),
          port: config.get<number>('POSTGRES_DATABASE_PORT'),
          entities: [
            UserEntity,
            RoleEntity,
            PermissionEntity,
            BrandEntity,
            CategoryEntity,
            ProductEntity,
            ImageEntity,
            LanguageEntity,
            ProductNameEntity,
            OrderEntity,
            OrderItemEntity
          ],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
