import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const SystemController = (route: string) => {
  return applyDecorators(
    ApiTags(`finance/api/v1/system/${{ route }}`),
    Controller(`finance/api/v1/system/${{ route }}`),
  );
};
