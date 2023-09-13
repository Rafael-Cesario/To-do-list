import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TaskModel } from './task.model';
import { CreateTaskInput } from './task.dto';
import { TaskService } from './task.service';

@Resolver()
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Mutation(() => TaskModel)
  async createTask(@Args('createTaskData') createTaskData: CreateTaskInput) {
    return this.taskService.createTask(createTaskData);
  }
}
