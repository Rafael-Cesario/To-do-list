import request from 'supertest-graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { userQueries } from './queries/user';
import { CreateUserResponse } from './interfaces/user';
import { CreateUserInput } from 'src/models/user/user.dto';

describe('User', () => {
  let prisma: PrismaService;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleFixture.get(PrismaService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('Create user', () => {
    afterEach(async () => {
      await prisma.user.deleteMany();
    });

    it('Create a new user', async () => {
      const createUserData = { email: 'user01@email.com', name: 'user01', password: 'Password123' };
      const { data } = await request<CreateUserResponse, { createUserData: CreateUserInput }>(app.getHttpServer()).mutate(userQueries.CREATE_USER).variables({ createUserData });
      const user = await prisma.user.findUnique({ where: { id: data.createUser.id } });

      expect(data.createUser).toBeDefined();
      expect(data.createUser.password).toBe('');
      expect(user.password).not.toBe(createUserData.password);
    });

    it('Throws a bad request error due to invalid data', async () => {
      const { errors } = await request<CreateUserResponse, { createUserData: CreateUserInput }>(app.getHttpServer())
        .mutate(userQueries.CREATE_USER)
        .variables({ createUserData: { email: '', name: '', password: '' } });

      expect(errors[0].message).toHaveLength(3);
    });

    it('Throws a error due to duplicated user', async () => {
      const createUserData = { email: 'user01@email.com', name: 'user01', password: 'Password123' };

      await request<CreateUserResponse, { createUserData: CreateUserInput }>(app.getHttpServer()).mutate(userQueries.CREATE_USER).variables({ createUserData });
      const { errors } = await request<CreateUserResponse, { createUserData: CreateUserInput }>(app.getHttpServer()).mutate(userQueries.CREATE_USER).variables({ createUserData });

      expect(errors[0].message).toMatch(/duplicated:/);
    });
  });
});
