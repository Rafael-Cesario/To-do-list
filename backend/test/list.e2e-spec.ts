import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { UserModel } from 'src/models/user/user.model';
import { PrismaService } from 'src/prisma/prisma.service';

describe('Lists', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let user: UserModel;

  const createUser = async () => {
    user = await prisma.user.create({ data: { email: 'user01@email.com', name: 'user01', password: 'Password123' } });
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleFixture.get(PrismaService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
    await createUser();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  describe('Create List', () => {
    afterEach(async () => {
      await prisma.list.deleteMany();
    });

    it.todo('Create a new list');

    it.todo('Throws an error due to duplicated name');

    it.todo('Throws a error due to empty values');
  });
});
