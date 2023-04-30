import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './config/config.module';
import { ProductModule } from './products/product.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../uploads'),
      serveRoot: '/uploads',
    }),
  ],
})
export class AppModule {}
