export class SymbolVO {
  private readonly symbol: string;

  constructor(symbol: string) {
    this.validate(symbol);
    this.symbol = symbol;
  }

  validate(symbol: string): void {
    const regex = /^[A-Z]{4,5}[34]?[11]?$/;
    if (!regex.test(symbol)) {
      throw new Error('Invalid symbol format');
    }
  }

  getSymbol(): string {
    return this.symbol;
  }
}
