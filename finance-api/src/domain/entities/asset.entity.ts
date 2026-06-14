import { BaseEntity } from './base.entity';
import { OrderEntity } from './order.entity';

export class AssetEntity extends BaseEntity {
  private symbol: string;
  private oders: OrderEntity[];

  constructor(id: string, symbol: string) {
    super(id, new Date(), new Date());
    this.symbol = symbol;
    this.oders = [];
  }

  getSymbol(): string {
    return this.symbol;
  }

  setSymbol(symbol: string): void {
    this.symbol = symbol;
  }

  getOrders(): OrderEntity[] {
    return this.oders;
  }

  addOrder(order: OrderEntity): void {
    this.oders.push(order);
  }
}
