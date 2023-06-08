import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto,CreateOrderProductsDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import {Permissions} from 'src/common/decorators/permissions.decorator'
import {CurrentUser} from 'src/common/decorators/current-user.decorator'
import { UserEntity } from 'src/modules/users/entities/user.entity';
@Controller('orders')
@ApiTags('Order Controller')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Permissions()
  create(@Body() createOrderDto: CreateOrderProductsDto,@CurrentUser() user:UserEntity) {
    return this.ordersService.create(createOrderDto,user);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
