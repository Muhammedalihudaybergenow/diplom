import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(12);
    const password = await bcrypt.hash(createUserDto.password, salt);
    return this.userRepo.save({
      username: createUserDto.username,
      password: password,
      status: createUserDto.status,
    });
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({
      id,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const user = await this.userRepo.findOneBy({
        id,
      });
      if (!user) {
        return 'User not found';
      } else {
        const checkPassword: boolean = await bcrypt.compare(
          updateUserDto.password,
          user.password,
        );
        if (!checkPassword) {
          return 'User password is incorrect';
        }
        const salt = await bcrypt.genSalt(12);
        updateUserDto.newPassword = await bcrypt.hash(
          updateUserDto.newPassword,
          salt,
        );
      }
    }
    return this.userRepo.save({
      id,
      password: updateUserDto.newPassword,
    });
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
