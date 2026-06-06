import { PartialType } from '@nestjs/swagger';
import { CreateAssetDto } from './createAsset.dto';

export class UpdateAssetDto extends PartialType(CreateAssetDto) {}
