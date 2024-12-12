import { Body, Controller, Get, Post } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/createAsset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}
  
  @Get()
  public findAll() {
    return this.assetsService.findAll();
  }

  @Post()
  public create(@Body() assetDto: CreateAssetDto) {
    return this.assetsService.create(assetDto);
  }
}
