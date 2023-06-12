import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ProductEntity } from "../entities/product.entity";

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor(private dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager());
  }

  findAllWithIds(ids: number[], languageId: number) {
    return this.createQueryBuilder('products')
      .leftJoinAndSelect(
        'products.names',
        'names',
        'names.languageId =:languageId',
        { languageId },
      )
      .where('products.id IN (:...ids)', { ids })
      .getMany();
  }

  findIds(ids: number[]) {
    return this.createQueryBuilder('products')
      .where('products.id IN (:...ids)', { ids })
      .getMany();
  }
}