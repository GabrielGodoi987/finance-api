import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssetsService {
    constructor(private readonly prismaService: PrismaService) { }
    public async findAll() {
        await this.prismaService.asset.findMany();
    }
    public create() { }
}
