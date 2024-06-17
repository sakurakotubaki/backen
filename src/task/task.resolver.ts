import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from './models/task.model';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/createTask.input';

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task], { nullable: 'items' })
  getTasks(): Task[] {
    return this.taskService.getTasks();
  }

  @Mutation(() => Task)
  createTask(
    // @Args('name') name: string,
    // @Args('dueDate') dueDate: string,
    // @Args('description', { nullable: true }) description?: string,
    @Args('createTaskInput') createTaskInput: CreateTaskInput): Task {
    // return this.taskService.createTask(name÷, dueDate, description);
    return this.taskService.createTask(createTaskInput);
  }
}
