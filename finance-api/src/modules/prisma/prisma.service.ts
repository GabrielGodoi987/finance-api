import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaTransactionStorage } from '../../infra/database/prisma-context/prisma.context';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    const connectionString = configService.get<string>('DATABASE_URL');

    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    super({
      adapter,
    });
  }

  async runInTransaction<T>(fn: () => Promise<T>): Promise<T> {
    return super.$transaction(async (tx) => {
      return PrismaTransactionStorage.run(tx, () => fn());
    });
  }

  getClient(): Prisma.TransactionClient | this {
    return PrismaTransactionStorage.getStore() ?? this;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
