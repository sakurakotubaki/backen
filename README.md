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