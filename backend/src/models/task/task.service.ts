import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskInput, UpdateTaskInput } from './task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(createTaskData: CreateTaskInput) {
    const isDuplicated = await this.prisma.task.findFirst({ where: { title: createTaskData.title } });
    if (isDuplicated) throw new ConflictException('duplicated: A task with the same title already exist');

    const { tags, ...taskData } = createTaskData;
    const task = await this.prisma.task.create({ data: { ...taskData, tags: { create: tags } }, include: { tags: true } });

    return task;
  }

  async updateTask(updateTaskData: UpdateTaskInput) {
    const { tags, taskID, ...taskInput } = updateTaskData;

    const isDuplicated = await this.prisma.task.findFirst({ where: { title: taskInput.title, NOT: { id: taskID } } });
    if (isDuplicated) throw new ConflictException('duplicated: A task with the same title already exist');

    const task = await this.prisma.task.update({
      where: { id: taskID },
      data: { ...taskInput, tags: { deleteMany: {}, createMany: { data: tags } } },
      include: { tags: true },
    });

    return task;
  }
}
