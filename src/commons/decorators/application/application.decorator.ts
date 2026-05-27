import { applyDecorators, Controller } from '@nestjs/common';

export const ApplicationController = (route: string) => {
  return applyDecorators(Controller(`finance/api/v1/${route}`));
};
