import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { CreateOrderProductsDto } from '../dto/create-order.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { OrderStatusEnum } from '../enum/order.enum';
import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderQueryDto } from '../dto/create-order-query.dto';

@Injectable()
export class OrderRepository extends Repository<OrderEntity> {
  constructor(private dataSource: DataSource) {
    super(OrderEntity, dataSource.createEntityManager());
  }

  async createAndSave(
    products: ProductEntity[],
    dto: CreateOrderProductsDto,
    user: UserEntity,
  ) {
    const date = Date.now();
    const orderNo = (Math.random() + 1).toString(36).substring(7);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      const order = new OrderEntity({
        user: new UserEntity({ id: user.id }),
        createdAt: date,
        updatedAt: date,
        status: OrderStatusEnum.PENDING,
        orderNo,
        items: dto.products.map((orderProduct) => {
          const product = products.find(
            (product) => product.id === orderProduct.productId,
          );
          return new OrderItemEntity({
            amount: orderProduct.amount,
            name: product.names[0].name,
            price: orderProduct.price * orderProduct.amount,
            product,
          });
        }),
      });
      products.forEach((product) => {
        product.amount =
          product.amount -
          dto.products.find((prod) => prod.productId === product.id).amount;
      });
      const newOrder = await queryRunner.manager.save(order);
      await queryRunner.manager.save(products);
      await queryRunner.commitTransaction();
      return newOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  statusUpdate(id: number, status: OrderStatusEnum) {
    const entity = new OrderEntity({
      id,
      status,
      updatedAt: Date.now(),
    });
    return this.update(id, entity);
  }

  findAllOrders(dto: OrderQueryDto) {
    const {
      endDate,
      limit,
      orderBy,
      orderDirection,
      search,
      skip,
      startDate,
      status,
    } = dto;
    const query = this.createQueryBuilder('orders');
    if (startDate) {
      query.andWhere('orders.createdAt >:startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('orders.createdAt <:endDate', { endDate });
    }
    if (search) {
      query.andWhere('orders.orderNo ILIKE (:search)', {
        search: `%${search}%`,
      });
    }
    if (status) {
      query.andWhere('orders.status =:status', { status });
    }
    return query
      .take(limit)
      .skip((skip - 1) * limit)
      .orderBy(orderBy, orderDirection)
      .getManyAndCount();
  }
  findOneCredentials(id: number) {
    return this.createQueryBuilder('order')
      .leftJoinAndSelect('order.items', 'items')
      .where('order.id =:id', { id })
      .getOne();
  }
}
