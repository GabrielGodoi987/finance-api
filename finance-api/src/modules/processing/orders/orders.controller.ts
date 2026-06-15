import { Body } from '@nestjs/common';
import { ApplicationController } from '../../../commons/decorators/application/application.decorator';
import { GetRoute } from '../../../commons/decorators/application/controller/get-route.decorator';
import { PostRoute } from '../../../commons/decorators/application/controller/post-route.decorator';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrdersService } from './orders.service';

@ApplicationController('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @GetRoute('', {}, { status: 200, description: 'Lista de todas as orders' })
  public findAll() {
    return this.orderService.findAll();
  }

  @PostRoute('', { type: CreateOrderDto }, { status: 201, description: 'Order criada com sucesso' })
  public create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }
}
