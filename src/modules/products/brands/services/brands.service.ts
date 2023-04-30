import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from '../entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandEntity) private brandRepo: Repository<BrandEntity>,
  ) {}
  create(createBrandDto: CreateBrandDto, file: Express.Multer.File) {
    const { name } = createBrandDto;
    const brand = new BrandEntity();
    brand.name = name;
    brand.link = file.path;
    return this.brandRepo.save(brand);
  }

  findAll() {
    return `This action returns all brands`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
