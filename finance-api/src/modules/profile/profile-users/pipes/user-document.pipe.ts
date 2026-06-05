import {
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DocumentIsNotValidError } from '../../../../domain/domain-errors/value-object.errors';
import { DocumentFactory } from '../../../../domain/value-objects/documents.vo';

@Injectable()
export class UserDocumentPipe implements PipeTransform {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  transform(value: any) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Document must be a string');
    }

    const country = this.resolveCountry();

    try {
      const doc = DocumentFactory.create(country, value);
      return {
        document: doc.getValue(),
        country,
        formatted: doc.getFormatted(),
      };
    } catch (error) {
      if (error instanceof DocumentIsNotValidError) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  private resolveCountry(): string {
    const country = this.request.header('x-country-code');
    return country?.toUpperCase() || 'BR';
  }
}
