import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secretOrPrivateKey: 'jwt-secret',
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [JwtService, AuthService, JwtAuthGuard, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
