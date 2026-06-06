import { HttpStatus } from "@nestjs/common";

export interface SuccessResponse{
  message: string;
  status: HttpStatus;
  timetamp: string;
}