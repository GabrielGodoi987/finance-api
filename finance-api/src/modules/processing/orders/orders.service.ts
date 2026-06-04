import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/createOrder.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  public findAll() {
    return this.prismaService.order.findMany();
  }
  public create(createOrder: CreateOrderDto) {
    return this.prismaService.order.create({
      data: {
        totalPrice: createOrder.totalPrice,
        assetId: createOrder.assetId,
        userId: createOrder.userId,
        status: createOrder.status,
        type: createOrder.type,
      },
    });
  }
}
