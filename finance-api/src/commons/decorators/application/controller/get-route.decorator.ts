import { applyDecorators, Get } from '@nestjs/common';
import {
  ApiQuery,
  ApiQueryOptions,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';

export const GetRoute = (
  path: string,
  apiQueryOption: ApiQueryOptions,
  apiResponseOptions: ApiResponseOptions,
) => {
  return applyDecorators(
    Get(path),
    ApiQuery(apiQueryOption),
    ApiResponse(apiResponseOptions),
  );
};
