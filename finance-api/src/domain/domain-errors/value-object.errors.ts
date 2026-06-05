export class SymbolIsNotValidError extends Error {
  constructor(params?: { message: string }) {
    super(params?.message || 'Symbol is not valid');
    this.name = 'SymbolIsNotValidError';
  }
}

export class PriceIsNotValidError extends Error {
  constructor(params?: { message: string }) {
    super(params?.message || 'Price is not valid');
    this.name = 'PriceIsNotValidError';
  }
}

export class DocumentIsNotValidError extends Error {
  constructor(params?: { message: string }) {
    super(params?.message || 'Document is not valid');
    this.name = 'DocumentIsNotValidError';
  }
}
