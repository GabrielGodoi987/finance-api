import { PrismaService } from '../../src/modules/prisma/prisma.service';

export default async function createOrder(
  prismaService: PrismaService,
): Promise<void> {
  const orders = Array.from({ length: 5 }).map((_, index) => ({
    id: `order-${index}`,
    assetId: `asset-${index}`,
    quantity: index + 1,
    price: (index + 1) * 10,
  }));

  try {
    await prismaService.order.createMany({
      data: orders,
    });
  } catch (error) {
    console.error('Error creating orders:', error);
  }
}
