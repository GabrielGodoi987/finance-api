import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssetDto } from './dto/createAsset.dto';

@Injectable()
export class AssetsService {
  constructor(private readonly prismaService: PrismaService) {}
  public findAll() {
    return this.prismaService.asset.findMany();
  }
  public create(assetsDto: CreateAssetDto) {
    const assetAlreadyExists = this.prismaService.asset.findFirst({
      where: {
        id: assetsDto.id,
      },
    });

    if (assetAlreadyExists) {
      throw new BadRequestException(`the ${assetsDto.id} asset already exists`);
    }

    return this.prismaService.asset.create({
      data: {
        id: assetsDto.id,
        symbol: assetsDto.symbol,
      },
    });
  }
}
