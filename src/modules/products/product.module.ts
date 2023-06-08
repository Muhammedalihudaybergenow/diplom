import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService,ProductRepository],
  imports: [
    BrandsModule,
    CategoriesModule,
    TypeOrmModule.forFeature([ProductEntity]),
  ],
  exports:[ProductRepository]
})
export class ProductModule {}
