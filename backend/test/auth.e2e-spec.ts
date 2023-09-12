import request from 'supertest-graphql';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { authQueries } from './queries/auth';
import { LoginModel } from 'src/models/authentication/auth.models';
import { LoginInput } from 'src/models/authentication/auth.dto';
import { CreateUserInput } from 'src/models/user/user.dto';
import { encryptPassword } from 'src/utils/crypt';

describe('Authentication', () => {
  let prisma: PrismaService;
  let app: INestApplication;
  const user: CreateUserInput = { email: 'user01@email.com', name: 'user01', password: 'Password123' };

  const createUser = async () => {
    await prisma.user.create({ data: { ...user, password: encryptPassword(user.password) } });
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    prisma = moduleFixture.get(PrismaService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await createUser();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  describe('Login', () => {
    const loginRequest = async (loginData: LoginInput) => {
      const { data, errors } = await request<{ login: LoginModel }>(app.getHttpServer()).mutate(authQueries.LOGIN).variables({ loginData });
      return { data, error: errors?.[0].message };
    };

    it('Generates a token after login', async () => {
      const { data } = await loginRequest({ email: user.email, password: user.password });

      expect(data.login).toEqual({
        email: expect.any(String),
        userID: expect.any(String),
        token: expect.any(String),
      });
    });

    it('Throws an error due to empty data', async () => {
      const { error } = await loginRequest({ email: '', password: '' });
      expect(error).toHaveLength(2);
    });

    it('Throws an error due to wrong password', async () => {
      const { error } = await loginRequest({ email: user.email, password: 'Wrong one' });
      expect(error).toBe('unauthorized: Invalid credentials');
    });
  });
});
