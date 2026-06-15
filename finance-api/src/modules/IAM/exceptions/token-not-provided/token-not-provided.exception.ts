export class TokenNotProvidedException extends Error {
  private status: number;

  constructor(msg: string) {
    super(msg);

    this.status = 401;
  }

  getStatus(): number {
    return this.status;
  }
}
