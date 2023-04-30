import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { BrandsModule } from './brands/brands.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [BrandsModule]
})
export class ProductModule {}
