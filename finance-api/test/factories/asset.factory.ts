import { Asset } from '@prisma/client';
import { PrismaService } from '../../src/modules/prisma/prisma.service';

export default async function createAsset(
  prismaService: PrismaService,
): Promise<void> {
  try {
    const assets: Asset[] = Array.from({ length: 5 }).map((_, index) => ({
      id: `asset-${index}`,
      symbol: `ASSET${index}`,
      price: (index + 1) * 10,
    }));

    await prismaService.asset.createMany({
      data: assets,
    });
  } catch (error) {
    console.error('Error creating assets:', error);
  }
}
