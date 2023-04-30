import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from '../dtos/login.dto';
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
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '1h',
      },
    );
    return {
      accessToken,
    };
  }

  async registration(dto: LoginDto) {
    const { password, username } = dto;
    const user = await this.userRepo.findOneBy({
      username,
    });
    if (user) {
      return 'User already registered';
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const userEntity = new UserEntity({
      password: hashedPassword,
      status: 'active',
      username,
    });
    const newUser = await this.userRepo.save(userEntity);
    const accessToken = await this.jwtService.signAsync(
      {
        id: newUser.id,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '1h',
      },
    );
    return {
      accessToken,
    };
  }
}
