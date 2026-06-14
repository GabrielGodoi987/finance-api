import { OrderStatusEnum } from '../value-objects/order-status.enum';
import { PriceVO } from '../value-objects/price.vo';
import { BaseEntity } from './base.entity';

export class OrderEntity extends BaseEntity {
  assetId: string;
  price: PriceVO;
  status: OrderStatusEnum;

  constructor(
    id: string,
    assetId: string,
    price: number,
    status: OrderStatusEnum,
  ) {
    super(id, new Date(), new Date());
    this.assetId = assetId;
    this.price = new PriceVO(price);
    this.status = status;
  }

  getPrice(): number {
    return this.price.getPrice();
  }
}
