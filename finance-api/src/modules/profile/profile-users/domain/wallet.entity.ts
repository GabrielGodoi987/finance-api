import { v4 } from 'uuid';

export class WalletEntity {
  private id: string;
  private balance: number;
  private userId: string;

  private constructor(id: string, balance: number, userId: string) {
    this.id = id;
    this.balance = balance;
    this.userId = userId;
  }

  static create(userId: string): WalletEntity {
    return new WalletEntity(v4(), 0, userId);
  }

  static fromPersistence(id: string, balance: number, userId: string): WalletEntity {
    return new WalletEntity(id, balance, userId);
  }

  getId(): string {
    return this.id;
  }

  getBalance(): number {
    return this.balance;
  }

  credit(amount: number): void {
    this.balance += amount;
  }

  debit(amount: number): void {
    if (amount > this.balance) {
      throw new Error('Insufficient balance');
    }
    this.balance -= amount;
  }

  getUserId(): string {
    return this.userId;
  }

  toJSON() {
    return {
      id: this.id,
      balance: this.balance,
      userId: this.userId,
    };
  }
}
