import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { UserModel } from 'src/models/user/user.model';
import { PrismaService } from 'src/prisma/prisma.service';

describe('Authentication', () => {
  let prisma: PrismaService;
  let app: INestApplication;
  let user: UserModel;

  const createUser = async () => {
    const newUser = await prisma.user.create({ data: { email: 'user01@email.com', name: 'user01', password: 'Password123' } });
    user = newUser;
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    prisma = moduleFixture.get(PrismaService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await createUser();
  });

  describe('Login', () => {
    it.todo('Generates a token after login');

    it.todo('Throws an error due to empty data');

    it.todo('Throws an error due to wrong password');
  });
});
