import request from 'supertest-graphql';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { ListModel } from 'src/models/list/list.models';
import { CreateTaskInput, DeleteTaskInput, UpdateTaskInput } from 'src/models/task/task.dto';
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

  describe('Update task', () => {
    let task: TaskModel;

    beforeEach(async () => {
      const data = await prisma.task.create({
        data: { listID: list.id, title: 'task01', description: '', status: 'NEXT', tags: { create: { color: '205090', name: 'tag01' } } },
        include: { tags: true },
      });

      task = { ...data, status: Status[data.status] };
    });

    afterEach(async () => {
      await prisma.tag.deleteMany();
      await prisma.task.deleteMany();
    });

    const requestUpdateTask = async (updateTaskData: UpdateTaskInput) => {
      const { data, errors } = await request<{ updateTask: TaskModel }>(app.getHttpServer()).mutate(taskQueries.UPDATE_TASK).variables({ updateTaskData });
      return { data, errors };
    };

    it('Change title, description, status of a task', async () => {
      const updateTaskInput: UpdateTaskInput = { title: 'new title', description: 'new description', status: Status.DONE, tags: [], taskID: task.id };
      const { data } = await requestUpdateTask(updateTaskInput);

      expect(data.updateTask.title).toBe(updateTaskInput.title);
      expect(data.updateTask.description).toBe(updateTaskInput.description);
      expect(data.updateTask.status).toBe(updateTaskInput.status);
    });

    it('Sync tags', async () => {
      const updateTaskInput: UpdateTaskInput = {
        taskID: task.id,
        title: 'new title',
        description: 'new description',
        status: Status.DONE,
        tags: [
          { name: 'tag01', color: '#101010' },
          { name: 'tag02', color: '#303030' },
        ],
      };
      const { data } = await requestUpdateTask(updateTaskInput);

      expect(data.updateTask.tags).toHaveLength(2);
      expect(data.updateTask.tags[0].taskID).toBe(data.updateTask.id);
    });

    it('Throws an error due to duplicated title', async () => {
      const title = 'task02';

      await prisma.task.create({
        data: { listID: list.id, title, description: '', status: 'NEXT', tags: { create: { color: '205090', name: 'tag01' } } },
        include: { tags: true },
      });

      const updateTaskInput: UpdateTaskInput = { title, description: 'new description', status: Status.DONE, tags: [], taskID: task.id };
      const { errors } = await requestUpdateTask(updateTaskInput);

      expect(errors[0].message).toBe('duplicated: A task with the same title already exist');
    });
  });

  describe('Delete task', () => {
    let task: TaskModel;

    beforeEach(async () => {
      const data = await prisma.task.create({
        data: { listID: list.id, title: 'task01', description: '', status: 'NEXT', tags: { create: { color: '205090', name: 'tag01' } } },
        include: { tags: true },
      });

      task = { ...data, status: Status[data.status] };
    });

    afterEach(async () => {
      await prisma.tag.deleteMany();
      await prisma.task.deleteMany();
    });

    const requestDeleteTask = async (deleteTaskData: DeleteTaskInput) => {
      const { data, errors } = await request<{ deleteTask: string }>(app.getHttpServer()).mutate(taskQueries.DELETE_TASK).variables({ deleteTaskData });
      return { data, errors };
    };

    it('Delete a task', async () => {
      const { data } = await requestDeleteTask({ taskID: task.id });
      expect(data.deleteTask).toBe('Success: Your task was deleted');
    });

    it('Throws an error, task not found', async () => {
      const { errors } = await requestDeleteTask({ taskID: 'not found' });
      expect(errors[0].message).toBe('notFound: Task not found');
    });
  });
});
