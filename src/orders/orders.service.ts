import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatusEnum } from './enums/Satatus.enum';
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
        price: createOrder.price,
        asset_id: createOrder.asset_id,
        status: createOrder.status,
      },
    });
  }
}
