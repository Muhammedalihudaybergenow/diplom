import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(username: string, password: string) {
    return this.jwtService.sign(
      {
        username,
      },
      {
        secret: 'jwt-secret',
      },
    );
  }

  auth(token: string) {
    return this.jwtService.decode(token);
  }
}
