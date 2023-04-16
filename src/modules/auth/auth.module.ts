import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secretOrPrivateKey: 'jwt-secret',
    }),
  ],
  providers: [JwtService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
