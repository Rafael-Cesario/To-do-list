import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';

describe('User resolver', () => {
  let prisma: PrismaService;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleFixture.get(PrismaService);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Create user', () => {
    afterEach(async () => {
      await prisma.user.deleteMany();
    });

    it.todo('Create a new user', async () => {});

    it.todo('Throws a bed request error due to invalid data');

    it.todo('Throws a error due to duplicated user');
  });
});
