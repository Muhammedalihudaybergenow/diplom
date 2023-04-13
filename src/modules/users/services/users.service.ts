import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepo.save({
      username: createUserDto.username,
      password: createUserDto.password,
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

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepo.save({
        id,
        ...updateUserDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
