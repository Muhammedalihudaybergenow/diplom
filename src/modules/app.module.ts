import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './config/config.module';
import { ProductModule } from './products/product.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LanguagesModule } from './languages/languages.module';
import { OrdersModule } from './orders/orders.module';
import { FilesModule } from './files/files.module';

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
    LanguagesModule,
    OrdersModule,
    FilesModule,
  ],
})
export class AppModule {}
