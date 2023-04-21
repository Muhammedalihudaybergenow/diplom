import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
