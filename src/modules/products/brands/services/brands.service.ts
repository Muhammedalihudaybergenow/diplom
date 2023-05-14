import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from '../entities/brand.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

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
    return this.brandRepo
      .createQueryBuilder('brand')
      .where('brand.id =:id', { id })
      .getOne();
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  async remove(id: number) {
    const brand = await this.brandRepo.findOneBy({
      id,
    });
    console.log(brand);
    const result = fs.unlinkSync(brand.link);
    await this.brandRepo.remove(brand);
    return 'Success';
  }
}
