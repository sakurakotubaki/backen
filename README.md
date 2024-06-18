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

install package:
```bash
npm i class-validator class-transformer
```

## db start

Dockerを起動するコマンド:
```bash
docker-compose up -d
```

```bash
docker exec -it postgres psql -U udemy_user udemydb
```

すでに作っていて、エラーが出た時の対処方法：
```bash
docker stop postgres
docker rm postgres
```

コンテナを再起動する
```bash
docker-compose up -d
```

[prisma](https://www.prisma.io/docs/getting-started/quickstart)

install prisma:
```bash
npm install prisma --save-dev
```

init:
```bash
npx prisma init
```

create model:
```ts
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// create model
model Task {
  id Int @id @default(autoincrement())
  name String @db.VarChar(255)
  dueDate String @db.VarChar(10)
  status Status @default(NOT_STARTED)
  description String?
  createdAt DateTime @default(now()) @db.Timestamp(0)
  upteatedAt DateTime @updatedAt @db.Timestamp(0)
}

enum Status {
  NOT_STARTED
  IN_PROGRESS
  COMPLETED
}
```

migration:
```bash
npx prisma migrate dev --name init
```

prisma studio:
```bash
npx prisma studio
```

[Prisma Client](https://docs.nestjs.com/recipes/prisma)

```bash
npm install @prisma/client
```

create service:
```bash
nest g module prisma
```

```bash
nest g service prisma --no-spec
```

## GraphQL Query & Mutation

query:
```
query {
  getTasks {
    id
    name
    dueDate
    description
    createdAt
    updatedAt
  }
}
```

mutation input:
```
mutation {
  createTask(createTaskInput: {name: "料理を作る", dueDate: "2024-01-01", description: "ズッキーニのサラダ"}) {
    id
    name
    dueDate
    status
    description
    createdAt
    updatedAt
  }
}
```

mutation update:
```
npx prisma migrate dev --name addUser
```

## crate user model

add module:
```bash
nest g module user
```

add resolver:
```bash
nest g resolver user --no-spec
```

add service:
```bash
nest g service user --no-spec
```

add bcrypt
```bash
npm install bcrypt @types/bcrypt
```

mutation create user:
```
mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    id
    name
    email
    createdAt
    updatedAt
  }
}
```

QUERY VARIABLES:
```
{
  "createUserInput": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "securepassword"
  }
}
```

GraphQL Query:
```
query getUser($email: String!) {
  getUser(email: $email) {
    id
    name
    email
  }
}
```

QUERY VARIABLES:
```
{
  "email": "john.doe@example.com"
}
```

## add auth package

```bash
nest g module auth
```

add resolver:
```bash
nest g resolver auth --no-spec
```

add service:
```bash
nest g service auth --no-spec
```

add package:
```bash
npm i @nestjs/passport passport passport-local
```

passport type
```bash
npm i --save-dev @types/passport-local
```

add jwt:
```bash
npm i @nestjs/jwt passport-jwt
```

type jwt:
```bash
npm i --save-dev @types/passport-jwt
```

.envにJWT_SECRETを追加
```
JWT_SECRET="jwt@secret#key"
```