import { applyDecorators, Controller } from '@nestjs/common';

export const SystemController = (route: string) => {
  return applyDecorators(Controller(`finance/api/v1/system/${{ route }}`));
};
