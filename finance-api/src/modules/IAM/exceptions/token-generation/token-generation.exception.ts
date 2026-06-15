export class TokenGenerationException extends Error {
  private status: number;
  constructor(msg: string) {
    super(msg);

    this.status = 502;
  }

  getStatus(): number {
    return this.status;
  }
}
