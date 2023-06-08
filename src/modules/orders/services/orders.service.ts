import { Injectable } from '@nestjs/common';
import { CreateOrderProductsDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { ProductRepository } from 'src/modules/products/repositories/product.repository';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(private productRepository:ProductRepository){
  }
  async create(createOrderDto: CreateOrderProductsDto,user:UserEntity) {
    const productIds = createOrderDto.products.map((product)=>product.productId)
    const products = await this.productRepository.findAllWithIds(productIds,createOrderDto.languageId);
    return products
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
