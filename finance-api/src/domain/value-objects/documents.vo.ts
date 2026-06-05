import { DocumentIsNotValidError } from '../domain-errors/value-object.errors';

export abstract class DocumentVO {
  protected readonly value: string;

  constructor(value: string) {
    const cleaned = value.replace(/\D/g, '');
    this.validate(cleaned);
    this.value = cleaned;
  }

  protected abstract validate(value: string): void;

  getValue(): string {
    return this.value;
  }

  getFormatted(): string {
    return this.value;
  }

  abstract getCountry(): string;
}

export class CpfDocument extends DocumentVO {
  validate(value: string): void {
    if (value.length !== 11) {
      throw new DocumentIsNotValidError({ message: 'CPF must have 11 digits' });
    }

    if (/^(\d)\1{10}$/.test(value)) {
      throw new DocumentIsNotValidError({
        message: 'CPF cannot have all digits equal',
      });
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(value[i]) * (10 - i);
    let rest = (sum * 10) % 11;
    if (rest === 10) rest = 0;
    if (rest !== parseInt(value[9])) {
      throw new DocumentIsNotValidError({ message: 'Invalid CPF' });
    }

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(value[i]) * (11 - i);
    rest = (sum * 10) % 11;
    if (rest === 10) rest = 0;
    if (rest !== parseInt(value[10])) {
      throw new DocumentIsNotValidError({ message: 'Invalid CPF' });
    }
  }

  getCountry(): string {
    return 'BR';
  }

  getFormatted(): string {
    return `${this.value.slice(0, 3)}.${this.value.slice(3, 6)}.${this.value.slice(6, 9)}-${this.value.slice(9)}`;
  }
}

export class CnpjDocument extends DocumentVO {
  validate(value: string): void {
    if (value.length !== 14) {
      throw new DocumentIsNotValidError({
        message: 'CNPJ must have 14 digits',
      });
    }

    if (/^(\d)\1{13}$/.test(value)) {
      throw new DocumentIsNotValidError({
        message: 'CNPJ cannot have all digits equal',
      });
    }

    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let sum = 0;
    for (let i = 0; i < 12; i++) sum += parseInt(value[i]) * weights1[i];
    let rest = sum % 11;
    rest = rest < 2 ? 0 : 11 - rest;
    if (rest !== parseInt(value[12])) {
      throw new DocumentIsNotValidError({ message: 'Invalid CNPJ' });
    }

    sum = 0;
    for (let i = 0; i < 13; i++) sum += parseInt(value[i]) * weights2[i];
    rest = sum % 11;
    rest = rest < 2 ? 0 : 11 - rest;
    if (rest !== parseInt(value[13])) {
      throw new DocumentIsNotValidError({ message: 'Invalid CNPJ' });
    }
  }

  getCountry(): string {
    return 'BR';
  }

  getFormatted(): string {
    return `${this.value.slice(0, 2)}.${this.value.slice(2, 5)}.${this.value.slice(5, 8)}/${this.value.slice(8, 12)}-${this.value.slice(12)}`;
  }
}

export class SsnDocument extends DocumentVO {
  validate(value: string): void {
    if (value.length !== 9) {
      throw new DocumentIsNotValidError({ message: 'SSN must have 9 digits' });
    }

    const area = parseInt(value.slice(0, 3));
    const group = value.slice(3, 5);
    const serial = value.slice(5);

    if (area === 0 || area === 666 || area >= 900) {
      throw new DocumentIsNotValidError({ message: 'Invalid SSN area number' });
    }

    if (group === '00') {
      throw new DocumentIsNotValidError({
        message: 'Invalid SSN group number',
      });
    }

    if (serial === '0000') {
      throw new DocumentIsNotValidError({
        message: 'Invalid SSN serial number',
      });
    }
  }

  getCountry(): string {
    return 'US';
  }

  getFormatted(): string {
    return `${this.value.slice(0, 3)}-${this.value.slice(3, 5)}-${this.value.slice(5)}`;
  }
}

export class EinDocument extends DocumentVO {
  validate(value: string): void {
    if (value.length !== 9) {
      throw new DocumentIsNotValidError({ message: 'EIN must have 9 digits' });
    }

    const prefix = parseInt(value.slice(0, 2));
    if (prefix < 1 || prefix > 99) {
      throw new DocumentIsNotValidError({ message: 'Invalid EIN prefix' });
    }

    const suffix = value.slice(2);
    if (suffix === '0000000') {
      throw new DocumentIsNotValidError({ message: 'Invalid EIN suffix' });
    }
  }

  getCountry(): string {
    return 'US';
  }

  getFormatted(): string {
    return `${this.value.slice(0, 2)}-${this.value.slice(2)}`;
  }
}

export class NifDocument extends DocumentVO {
  validate(value: string): void {
    if (value.length !== 9) {
      throw new DocumentIsNotValidError({ message: 'NIF must have 9 digits' });
    }

    const first = parseInt(value[0]);
    if (![1, 2, 3, 5, 6, 8, 9].includes(first)) {
      throw new DocumentIsNotValidError({
        message: 'Invalid NIF starting digit',
      });
    }

    let sum = 0;
    for (let i = 0; i < 8; i++) sum += parseInt(value[i]) * (9 - i);
    let rest = sum % 11;
    rest = rest < 2 ? 0 : 11 - rest;
    if (rest !== parseInt(value[8])) {
      throw new DocumentIsNotValidError({ message: 'Invalid NIF' });
    }
  }

  getCountry(): string {
    return 'PT';
  }

  getFormatted(): string {
    return `${this.value.slice(0, 3)} ${this.value.slice(3, 5)} ${this.value.slice(5)}`;
  }
}

export class DocumentFactory {
  static create(country: string, value: string): DocumentVO {
    const cleaned = value.replace(/\D/g, '');

    switch (country.toUpperCase()) {
      case 'BR':
        if (cleaned.length === 11) return new CpfDocument(cleaned);
        if (cleaned.length === 14) return new CnpjDocument(cleaned);
        throw new DocumentIsNotValidError({
          message: 'Brazilian document must have 11 (CPF) or 14 (CNPJ) digits',
        });
      case 'US':
        if (cleaned.length !== 9) {
          throw new DocumentIsNotValidError({
            message: 'US document must have 9 digits',
          });
        }
        return new SsnDocument(cleaned);
      case 'PT':
        if (cleaned.length !== 9) {
          throw new DocumentIsNotValidError({
            message: 'Portuguese document (NIF) must have 9 digits',
          });
        }
        return new NifDocument(cleaned);
      default:
        throw new DocumentIsNotValidError({
          message: `Unsupported country: ${country}`,
        });
    }
  }
}
