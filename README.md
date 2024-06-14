# Environment
new pg
```bash
nest new backend
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## GraphQL Project
`app.controller.ts & app.service.ts`は不要なので削除する。

## graphql install

[公式](https://docs.nestjs.com/graphql/quick-start#installation)

```bash
npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql
```

モデル用のモジュールを作成。
```bash
nest g module task
```

## graphql command
```bash
nest g resolver task --no-spec
```

```bash
nest g service task --no-spec
```

## 設定
task.module.ts
```ts
import { Module } from '@nestjs/common';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

@Module({
  providers: [TaskResolver, TaskService]
})
export class TaskModule {}
```

task.resolver.ts
```ts
import { Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './models/task.model';

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task], { nullable: 'items' })
  getTasks(): Task[] {
    return this.taskService.getTasks();
  }
}
```

app.module.ts
```ts
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TaskModule,
  ],
})
export class AppModule {}
```

task.service
```ts
import { Injectable } from '@nestjs/common';
import { Task } from './models/task.model';

@Injectable()
export class TaskService {
  tasks: Task[] = [];

  getTasks(): Task[] {
    const task1 = new Task();
    task1.id = 1;
    task1.name = 'Task 1';
    task1.dueDate = '2021-01-01';
    task1.dueDate = '2023-01-01';
    task1.status = 'NOT_STARTED';
    this.tasks.push(task1);
    return this.tasks;
  }
}
```