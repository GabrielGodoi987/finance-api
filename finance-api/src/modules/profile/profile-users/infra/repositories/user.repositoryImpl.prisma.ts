import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { UserRepository } from '../../domain/repositories/user-repository';
import { UserAggregate } from '../../domain/user.aggregate';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(aggregate: UserAggregate): Promise<UserAggregate> {
    const data = UserMapper.toPersistence(aggregate);

    const user = await this.prisma.user.upsert({
      where: { id: data.id },
      create: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        document: data.document,
        role: data.role as any,
        status: data.status as any,
        wallet: {
          create: { id: data.wallet.id, balance: data.wallet.balance },
        },
      },
      update: {
        name: data.name,
        email: data.email,
        password: data.password,
        document: data.document,
        role: data.role as any,
        status: data.status as any,
      },
      include: { wallet: true },
    });

    return UserMapper.toAggregate(user);
  }

  async findById(id: string): Promise<UserAggregate | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { wallet: true },
    });

    return user ? UserMapper.toAggregate(user) : null;
  }

  async findByEmail(email: string): Promise<UserAggregate | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { wallet: true },
    });

    return user ? UserMapper.toAggregate(user) : null;
  }

  async findByDocument(document: string): Promise<UserAggregate | null> {
    const user = await this.prisma.user.findUnique({
      where: { document },
      include: { wallet: true },
    });

    return user ? UserMapper.toAggregate(user) : null;
  }

  async update(
    id: string,
    data: Partial<{
      name: string;
      email: string;
      password: string;
      document: string;
      role: string;
      status: string;
    }>,
  ): Promise<UserAggregate> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.email !== undefined && { email: data.email }),
        ...(data.password !== undefined && { password: data.password }),
        ...(data.document !== undefined && { document: data.document }),
        ...(data.role !== undefined && { role: data.role as any }),
        ...(data.status !== undefined && { status: data.status as any }),
      },
      include: { wallet: true },
    });

    return UserMapper.toAggregate(user);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
