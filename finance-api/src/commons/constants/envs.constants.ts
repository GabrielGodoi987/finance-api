export const envs = {
  get DATABASE_URL(): string {
    return process.env.DATABASE_URL ?? '';
  },
  get API_TOKEN(): string {
    return process.env.API_TOKEN ?? '';
  },
  get PORT(): number {
    return Number(process.env.PORT ?? 3000);
  },
  get REDIS_HOST(): string {
    return process.env.REDIS_HOST ?? 'localhost';
  },
  get REDIS_PORT(): number {
    return Number(process.env.REDIS_PORT ?? 6379);
  },
  get JWT_ACCESS_SECRET(): string {
    return process.env.JWT_ACCESS_SECRET ?? '';
  },
  get JWT_EXPIRATION(): string {
    return process.env.JWT_EXPIRATION ?? '';
  },
  get JWT_REFRESH_SECRET(): string {
    return process.env.JWT_REFRESH_SECRET ?? '';
  },
  get JWT_REFRESH_EXPIRATION(): string {
    return process.env.JWT_REFRESH_EXPIRATION ?? '';
  },
};
