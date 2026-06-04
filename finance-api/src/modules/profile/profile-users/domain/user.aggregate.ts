import { AggregateBase } from '../../../../commons/lib/aggregate.base';
import {
  UserCreatedEvent,
  WalletCreatedEvent,
} from '../events/user.integration-events';
import { WalletEntity } from './wallet.entity';

export class UserAggregate extends AggregateBase {
  private id: string;
  private name: string;
  private email: string;
  private password: string;
  private document: string;
  private role: string;
  private wallet: WalletEntity;

  private constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    document: string,
    role: string,
    wallet: WalletEntity,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.document = document;
    this.role = role;
    this.wallet = wallet;
  }

  static create(
    id: string,
    name: string,
    email: string,
    password: string,
    document: string,
    role: string,
  ): UserAggregate {
    const wallet = WalletEntity.create(id);
    const aggregate = new UserAggregate(
      id,
      name,
      email,
      password,
      document,
      role,
      wallet,
    );

    aggregate.addEvent(new UserCreatedEvent(id, aggregate.toJSON()));
    aggregate.addEvent(new WalletCreatedEvent(wallet.getId(), wallet.toJSON()));

    return aggregate;
  }

  static fromPersistence(data: {
    id: string;
    name: string;
    email: string;
    password: string;
    document: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    wallet?: { id: string; balance: number; userId: string };
  }): UserAggregate {
    const wallet = data.wallet
      ? WalletEntity.fromPersistence(
          data.wallet.id,
          data.wallet.balance,
          data.wallet.userId,
        )
      : WalletEntity.create(data.id);

    const aggregate = new UserAggregate(
      data.id,
      data.name,
      data.email,
      data.password,
      data.document,
      data.role,
      wallet,
    );

    aggregate.setCreatedAt(data.createdAt);
    aggregate.setUpdatedAt(data.updatedAt);

    return aggregate;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  getDocument(): string {
    return this.document;
  }

  getRole(): string {
    return this.role;
  }

  getWallet(): WalletEntity {
    return this.wallet;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      document: this.document,
      role: this.role,
      wallet: this.wallet.toJSON(),
    };
  }
}
