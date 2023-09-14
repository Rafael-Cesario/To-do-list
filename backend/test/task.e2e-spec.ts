import request from 'supertest-graphql';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { ListModel } from 'src/models/list/list.models';
import { CreateTaskInput } from 'src/models/task/task.dto';
import { UserModel } from 'src/models/user/user.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status, TaskModel } from 'src/models/task/task.model';
import { taskQueries } from './queries/task';

describe('Task', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let user: UserModel;
  let list: ListModel;

  const createUser = async () => {
    const user = await prisma.user.create({ data: { email: 'user01@email.com', name: 'user01', password: 'user123' } });
    return user;
  };

  const createList = async () => {
    const list = await prisma.list.create({ data: { name: 'list01', userID: user.id } });
    return list;
  };

  const requestCreateTask = async (createTaskData: CreateTaskInput) => {
    const { data, errors } = await request<{ createTask: TaskModel }>(app.getHttpServer()).mutate(taskQueries.CREATE_TASK).variables({ createTaskData });
    return { data, errors };
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    prisma = moduleFixture.get(PrismaService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    user = await createUser();
    list = await createList();
  });

  afterEach(async () => {
    await prisma.list.deleteMany();
    await prisma.user.deleteMany();
  });

  describe('Create task', () => {
    afterEach(async () => {
      await prisma.tag.deleteMany();
      await prisma.task.deleteMany();
    });

    it('Create a task with tags', async () => {
      const createTaskData: CreateTaskInput = { listID: list.id, title: 'TASK 01', description: '', status: Status.NEXT, tags: [{ color: '#205090', name: 'TEST' }] };
      const { data } = await requestCreateTask(createTaskData);

      expect(data.createTask).toHaveProperty('id');
      expect(data.createTask).toHaveProperty('listID', createTaskData.listID);
      expect(data.createTask).toHaveProperty('title', createTaskData.title.toLowerCase());

      expect(data.createTask.tags[0]).toEqual({
        id: expect.any(String),
        taskID: data.createTask.id,
        color: expect.any(String),
        name: createTaskData.tags[0].name,
      });
    });

    it('Throws an error due to duplicated title', async () => {
      const createTaskData: CreateTaskInput = { listID: list.id, title: 'TASK 01', description: '', status: Status.NEXT, tags: [] };
      await requestCreateTask(createTaskData);

      const { errors } = await requestCreateTask(createTaskData);
      expect(errors[0].message).toBe('duplicated: A task with the same title already exist');
    });
  });
});
