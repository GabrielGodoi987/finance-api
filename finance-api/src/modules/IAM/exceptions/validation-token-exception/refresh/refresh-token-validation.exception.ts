export class RefreshTokenValidationException extends Error {
  private status: number;
  constructor(msg: string, status: number) {
    super(msg);
    this.status = status;
  }

  getStatus(): number {
    return this.status;
  }
}
