import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const ApplicationController = (route: string) => {
  return applyDecorators(
    Controller(`finance/api/v1/${route}`),
    ApiTags(`finance/api/v1/${route}`),
  );
};
