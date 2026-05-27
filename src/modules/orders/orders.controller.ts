import { Body, Get, Post } from '@nestjs/common';
import { ApplicationController } from '../../commons/decorators/application/application.decorator';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrdersService } from './orders.service';

@ApplicationController('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  public findAll() {
    return this.orderService.findAll();
  }

  @Post()
  public create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }
}
