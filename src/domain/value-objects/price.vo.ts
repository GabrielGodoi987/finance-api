import { PriceIsNotValidError } from '../domain-errors/value-object.errors';

export class PriceVO {
  private readonly price: number;

  constructor(price: number) {
    this.validate(price);
    this.price = price;
  }

  private validate(price: number): void {
    if (typeof price !== 'number' || isNaN(price) || price <= 0) {
      throw new PriceIsNotValidError({
        message: 'Price must be a positive number',
      });
    }
  }

  getPrice(): number {
    return this.price;
  }
}
