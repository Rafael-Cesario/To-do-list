import request from 'supertest-graphql';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { UserModel } from 'src/models/user/user.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { listQueries } from './queries/list';
import { CreateListInput, GetListInput } from 'src/models/list/list.dto';
import { ListModel } from 'src/models/list/list.models';

describe('Lists', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let user: UserModel;

  const createUser = async () => {
    user = await prisma.user.create({ data: { email: 'user01@email.com', name: 'user01', password: 'Password123' } });
  };

  const requestCreateList = async (createListData: CreateListInput) => {
    const { data, errors } = await request<{ createList: ListModel }>(app.getHttpServer()).mutate(listQueries.CREATE_LIST).variables({ createListData });
    return { data, error: errors?.[0] };
  };

  const requestGetLists = async (getListData: GetListInput) => {
    const { data, errors } = await request<{ getLists: ListModel }>(app.getHttpServer()).query(listQueries.GET_LISTS).variables({ getListData });
    return { data, error: errors?.[0].message };
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleFixture.get(PrismaService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  describe('Create List', () => {
    beforeEach(async () => {
      await createUser();
    });

    afterEach(async () => {
      await prisma.list.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Create a new list', async () => {
      const name = '  LIST01  ';
      const { data } = await requestCreateList({ name, userID: user.id });

      expect(data.createList).toEqual({
        name: name.toLowerCase().trim(),
        id: expect.any(String),
        userID: user.id,
      });
    });

    it('Throws an error due to duplicated name', async () => {
      const name = 'duplicated name';
      await requestCreateList({ name, userID: user.id });
      const { error } = await requestCreateList({ name, userID: user.id });
      expect(error.message).toBe('duplicated: A list with the same name already exist');
    });

    it('Throws a error due to empty values', async () => {
      const { error } = await requestCreateList({ name: '', userID: '' });
      expect(error.message).toEqual(['name must be longer than or equal to 3 characters', 'userID should not be empty']);
    });
  });

  describe('Get lists', () => {
    beforeAll(async () => {
      await createUser();
      await requestCreateList({ name: 'list', userID: user.id });
    });

    afterAll(async () => {
      await prisma.list.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Get all lists', async () => {
      const { data } = await requestGetLists({ userID: user.id });
      expect(data.getLists).toHaveLength(1);
    });

    it('Throws an error due to empty values', async () => {
      const { error } = await requestGetLists({ userID: '' });
      expect(error[0]).toBe('userID should not be empty');
    });

    it('Throws an error due to wrong userID', async () => {
      const { error } = await requestGetLists({ userID: 'wrong' });
      expect(error).toBe('notFound: User not found');
    });
  });
});
