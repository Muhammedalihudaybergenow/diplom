import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';
import { BrandEntity } from '../brands/entities/brand.entity';
import { CategoryEntity } from '../categories/entities/category.entity';
import { ImageEntity } from '../entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductQueryDto } from '../dto/product-query.dto';
import { ProductNameEntity } from '../entities/product-name.entity';
import { LanguageEntity } from 'src/modules/languages/entities/language.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) {}
  create(createProductDto: CreateProductDto) {
    const { brandId, categoryId,amount, price,names } =
      createProductDto;
    const product = new ProductEntity();
    product.brand = new BrandEntity({ id: brandId });
    product.category = new CategoryEntity({ id: categoryId });
    product.price = price;
    product.amount = amount;
    product.names = names.map((name)=>new ProductNameEntity({
      langauge: new LanguageEntity({
        id: name.languageId
      }),
      name: name.name
    }))
    return this.productRepo.save(product);
  }

  findAll(dto: ProductQueryDto) {
    let { limit, skip, brandIds, categoryIds, search,languageId } = dto;
    if (typeof brandIds === 'string') {
      brandIds = [brandIds];
    }
    if (typeof categoryIds === 'string') {
      categoryIds = [categoryIds];
    }
    const query = this.productRepo.createQueryBuilder('products')
    .leftJoinAndSelect('products.names',"names","names.languageId = :languageId",{languageId})
    if (brandIds) {
      query.andWhere('products.brandId IN (:...brandIds)', { brandIds });
    }
    if (categoryIds) {
      query.andWhere('products.categoryId IN (:...categoryIds)', {
        categoryIds,
      });
    }
  
    if (search) {
      query.andWhere(
        'products.name ILIKE (:search) OR products.description ILIKE (:search)',
        { search: `%${search}%` },
      );
    }
    return query
      .take(limit)
      .skip((skip - 1) * limit)
      .getMany();
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
