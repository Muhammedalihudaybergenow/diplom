import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './config/config.module';
import { ProductModule } from './products/product.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    ConfigurationModule,
    ProductModule,
    MulterModule.registerAsync({
      useFactory: async () => ({
        dest: './uploads',
      }),
    }),
  ],
})
export class AppModule {}
