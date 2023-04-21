import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userRepo.findOneBy({
      username,
    });
    if (!user) {
      return 'Not found';
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return 'Password is incorrect';
    }
    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
      },
      {
        secret: 'jwt-secret',
      },
    );
    return {
      accessToken,
    };
  }

  auth(token?: string) {
    const data = this.configService.get('POSTGRES_DATABASE_HOST');
    console.log(data);
    return data;
    // return this.jwtService.decode(token);
  }
}
