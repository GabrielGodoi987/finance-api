import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

export async function createTestingModule() {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const generateApp = moduleRef.createNestApplication();

  await generateApp.init();

  return { generateApp, moduleRef };
}
