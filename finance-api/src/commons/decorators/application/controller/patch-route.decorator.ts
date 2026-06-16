import { applyDecorators, Patch } from '@nestjs/common';
import {
  ApiBody,
  ApiBodyOptions,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';

export const PatchRoute = (
  path: string = '',
  apiBodyObject: ApiBodyOptions,
  apiResponse: ApiResponseOptions,
) => {
  return applyDecorators(
    Patch(path),
    ApiBody(apiBodyObject),
    ApiResponse(apiResponse),
  );
};
