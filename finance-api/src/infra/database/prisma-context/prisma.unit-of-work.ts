import { PrismaClient } from '@prisma/client';
import { IUnitOfWork } from '../../../commons/patterns/unit-of-work/unit-of-work.pattern';
import { PrismaTransactionStorage } from './prisma.context';

export class PrismaUnitOfWork implements IUnitOfWork {
  constructor(private readonly prisma: PrismaClient) {}

  async runInTransaction<T>(work: () => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async (txClient) => {
      return PrismaTransactionStorage.run(txClient, async () => {
        return await work();
      });
    });
  }
}
