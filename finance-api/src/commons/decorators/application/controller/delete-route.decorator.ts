import { applyDecorators, Delete } from '@nestjs/common';
import {
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';

export const DeleteRoute = (
  path: string = '',
  apiResponse: ApiResponseOptions,
) => {
  return applyDecorators(
    Delete(path),
    ApiResponse(apiResponse),
  );
};
