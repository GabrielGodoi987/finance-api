import { ApiTokenMiddleware } from '../../../../../src/commons/middlewares/api-token/api-token.middleware';

const mockConfigModule = {
  get: jest.fn((key: string) => {
    if (key === 'API_TOKEN') {
      return 'jesus_is_king';
    }
    return null;
  }),
};

describe('ApiTokenMiddleware', () => {
  let apiTokenMiddleware: ApiTokenMiddleware;
  let configService: any;

  beforeEach(() => {
    configService = mockConfigModule;
    apiTokenMiddleware = new ApiTokenMiddleware(configService);
  });

  it('should be defined', () => {
    expect(apiTokenMiddleware).toBeDefined();
  });

  describe('Sending correct token', () => {
    it('should call next() without errors', () => {
      const req = {
        headers: {
          'x-api-token': 'jesus_is_king',
        },
      } as any;

      const res = {} as any;
      const next = jest.fn();

      apiTokenMiddleware.use(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('Sending incorrect token', () => {
    it('should return 401 with error message', () => {
      const req = {
        headers: {
          'x-api-token': 'invalid-token',
        },
      } as any;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      const next = jest.fn();

      apiTokenMiddleware.use(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid API token' });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('Sending empty token', () => {
    it('should return 400 with error message', () => {
      const req = {
        headers: {
          'x-api-token': '',
        },
      } as any;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      const next = jest.fn();

      apiTokenMiddleware.use(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'API token is missing' });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('Sending no token', () => {
    it('should return 400 with error message', () => {
      const req = {
        headers: {},
      } as any;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      const next = jest.fn();

      apiTokenMiddleware.use(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'API token is missing' });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
