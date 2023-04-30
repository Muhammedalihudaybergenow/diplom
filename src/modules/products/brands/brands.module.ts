import { Module } from '@nestjs/common';
import { BrandsService } from './services/brands.service';
import { BrandsController } from './controllers/brands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './entities/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
