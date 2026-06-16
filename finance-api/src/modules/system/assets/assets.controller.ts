import { Body } from '@nestjs/common';
import { ApplicationController } from '../../../commons/decorators/application/application.decorator';
import { GetRoute } from '../../../commons/decorators/application/controller/get-route.decorator';
import { PostRoute } from '../../../commons/decorators/application/controller/post-route.decorator';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/createAsset.dto';

@ApplicationController('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @GetRoute('', {}, { status: 200, description: 'Lista de todos os assets' })
  public findAll() {
    return this.assetsService.findAll();
  }

  @PostRoute(
    '',
    { type: CreateAssetDto },
    { status: 201, description: 'Asset criado com sucesso' },
  )
  public create(@Body() assetDto: CreateAssetDto) {
    return this.assetsService.create(assetDto);
  }
}
