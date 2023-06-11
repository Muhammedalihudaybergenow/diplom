import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { OrderStatusDto } from '../dto/order.status.dto';
import { OrdersService } from '../services/orders.service';

@Controller({
  path: 'manager/orders',
})
@ApiTags('Manager Order Controller')
export class ManagerOrderController {
  constructor(private orderService: OrdersService) {}
  @Patch('status/:id')
  @Permissions()
  updateStatus(@Param('id') id: number, @Body() body: OrderStatusDto) {
    return this.orderService.statusUpdate(id, body);
  }
}
