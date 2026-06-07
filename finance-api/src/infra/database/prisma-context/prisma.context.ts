import { Prisma } from '@prisma/client';
import { AsyncLocalStorage } from 'async_hooks';

export const PrismaTransactionStorage =
  new AsyncLocalStorage<Prisma.TransactionClient>();
