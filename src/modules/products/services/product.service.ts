import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';
import { BrandEntity } from '../brands/entities/brand.entity';
import { CategoryEntity } from '../categories/entities/category.entity';
import { ImageEntity } from '../entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) {}
  create(createProductDto: CreateProductDto, files: Express.Multer.File[]) {
    const { brandId, categoryId, description, images, name, price } =
      createProductDto;
    const product = new ProductEntity();
    product.brand = new BrandEntity({ id: brandId });
    product.category = new CategoryEntity({ id: categoryId });
    product.price = price;
    product.name = name;
    product.description = description;
    product.images = files.map((file) => new ImageEntity({ link: file.path }));
    return this.productRepo.save(product);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return this.productRepo
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.brand', 'brand')
      .leftJoinAndSelect('products.category', 'category')
      .leftJoinAndSelect('products.images', 'images')
      .where('products.id =:id', { id })
      .getOne();
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
