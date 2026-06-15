import { applyDecorators, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiBodyOptions,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';

export const PostRoute = (
  path: string = '',
  apiBodyObject: ApiBodyOptions,
  apiResponse: ApiResponseOptions,
) => {
  return applyDecorators(
    Post(path),
    ApiBody(apiBodyObject),
    ApiResponse(apiResponse),
  );
};
