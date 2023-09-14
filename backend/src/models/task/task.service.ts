import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskInput, DeleteTaskInput, UpdateTaskInput } from './task.dto';

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

  async deleteTask({ taskID }: DeleteTaskInput) {
    const task = await this.prisma.task.findUnique({ where: { id: taskID } });
    if (!task) throw new NotFoundException('notFound: Task not found');

    await this.prisma.task.delete({ where: { id: taskID } });
    return 'Success: Your task was deleted';
  }
}
