import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { ProductModule } from '../products/product.module';
import { ProductRepository } from '../products/repositories/product.repository';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService,ProductRepository],
  imports:[ProductModule]
})
export class OrdersModule {}
