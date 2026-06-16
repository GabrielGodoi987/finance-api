import { applyDecorators, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiBodyOptions,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';

export const PutRoute = (
  path: string = '',
  apiBodyObject: ApiBodyOptions,
  apiResponse: ApiResponseOptions,
) => {
  return applyDecorators(
    Put(path),
    ApiBody(apiBodyObject),
    ApiResponse(apiResponse),
  );
};
