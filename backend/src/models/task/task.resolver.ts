import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TaskModel } from './task.model';
import { CreateTaskInput, DeleteTaskInput, UpdateTaskInput } from './task.dto';
import { TaskService } from './task.service';

@Resolver()
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Mutation(() => TaskModel)
  async createTask(@Args('createTaskData') createTaskData: CreateTaskInput) {
    return this.taskService.createTask(createTaskData);
  }

  @Mutation(() => TaskModel)
  async updateTask(@Args('updateTaskData') updateTaskData: UpdateTaskInput) {
    return this.taskService.updateTask(updateTaskData);
  }

  @Mutation(() => String)
  async deleteTask(@Args('deleteTaskData') deleteTaskData: DeleteTaskInput) {
    return this.taskService.deleteTask(deleteTaskData);
  }
}
