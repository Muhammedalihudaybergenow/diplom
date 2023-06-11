import { Injectable } from '@nestjs/common';
import { CreateOrderProductsDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { ProductRepository } from 'src/modules/products/repositories/product.repository';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { OrderErrorProductInterface } from '../interfaces/order-product-error.interface';
import { OrderRepository } from '../repositories/order.repository';
import { OrderStatusDto } from '../dto/order.status.dto';
import { OrderQueryDto } from '../dto/create-order-query.dto';
@Injectable()
export class OrdersService {
  constructor(
    private productRepository: ProductRepository,
    private orderRepository: OrderRepository,
  ) {}
  async create(createOrderDto: CreateOrderProductsDto, user: UserEntity) {
    const productIds = createOrderDto.products.map(
      (product) => product.productId,
    );
    const errorProducts: OrderErrorProductInterface[] = [];
    const products = await this.productRepository.findAllWithIds(
      productIds,
      createOrderDto.languageId,
    );
    createOrderDto.products.forEach((orderProduct) => {
      const product = products.find(
        (product) => product.id === orderProduct.productId,
      );
      if (!product) {
        errorProducts.push({
          id: orderProduct.productId,
          message: 'This product is not available',
        });
      } else {
        if (product.price !== orderProduct.price) {
          errorProducts.push({
            id: orderProduct.productId,
            message: 'Price is Not Valid',
            parameter: product.price,
          });
        }
        if (product.amount < orderProduct.amount) {
          errorProducts.push({
            id: orderProduct.productId,
            message: 'Out of stock',
            parameter: product.amount,
          });
        }
      }
    });
    if (errorProducts.length) {
      return errorProducts;
    }
    return await this.orderRepository.createAndSave(
      products,
      createOrderDto,
      user,
    );
  }

  findAll(dto: OrderQueryDto) {
    return this.orderRepository.findAllOrders(dto);
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {}

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
  statusUpdate(id: number, dto: OrderStatusDto) {
    return this.orderRepository.statusUpdate(id, dto.status);
  }
}
