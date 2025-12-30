---
title: Getting Started
sidebar:
  order: 1
root: true
description: This tutorial explain the features of the UQL orm and how to use get started with it.
---


[UQL](https:/uql.app) is the [smartest ORM](https:/medium.com/@rogerpadillac/in-search-of-the-perfect-orm-e01fcc9bce3d) for TypeScript, it is designed to be fast, safe, and easy to integrate into any application.

[UQL](https:/uql.app) can run in Node.js, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, Electron, Bun and Deno.

[UQL](https:/uql.app) has a consistent API for distinct databases, including PostgreSQL, MySQL, MariaDB, SQLite, and MongoDB.

&nbsp;

```ts
const companyUsers = await userRepository.findMany({
  $select: { email: true, profile: ['picture'] },
  $where: { email: { $endsWith: '@example.com' } },
  $sort: { createdAt: -1 },
  $limit: 100,
});
```

&nbsp;

## Why UQL?

See [this article](https:/medium.com/@rogerpadillac/in-search-of-the-perfect-orm-e01fcc9bce3d) in medium.com.

&nbsp;

## Features

- **Type-safe and Context-aware queries**: squeeze the powers of `TypeScript` so it auto-completes and validates, the appropriate operators on any level of the queries, [including the relations and their fields](/querying/relations).
- **Serializable queries**: its [syntax](/querying/logical-operators) can be `100%` valid `JSON` allowing the queries to be transported across platforms with ease.
- **Unified API across Databases**: same query is transparently transformed according to the configured database.
- **FP + OOP**: Combines the best elements of `FP` (Functional Programming) and `OOP` (Object Oriented Programming).
- [Declarative](/transactions-declarative) and [imperative](/transactions-imperative) `transactions` for flexibility, and `connection pooling` for scalability.
- Transparent support for [inheritance between entities](/entities/inheritance) for reusability and consistency.
- Modern [Pure ESM](https:/gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c): `ESM` is natively supported by Node.js 16 and later.
- **High performance**: the [generated queries](/querying/logical-operators) are fast, safe, and human-readable.
- Supports the [Data Mapper](https:/en.wikipedia.org/wiki/Data_mapper_pattern) pattern for maintainability.
- [soft-delete](/entities/soft-delete), [virtual fields](/entities/virtual-fields), [repositories](/querying/repository).
- Automatic handing of `json`, `jsonb` and `vector` fields.

&nbsp;

## 1. Install

1. Install the core package:

   ```sh
   npm install @uql/core --save
   ```

2. Install the driver for your database:

| Database     | Driver           | UQL Adapter          |
| ------------ | ---------------- | -------------------- |
| `PostgreSQL` | `pg`             | `@uql/core/postgres` |
| `SQLite`     | `better-sqlite3` | `@uql/core/sqlite`   |
| `MariaDB`    | `mariadb`        | `@uql/core/maria`    |
| `MongoDB`    | `mongodb`        | `@uql/core/mongo`    |
| `MySQL`      | `mysql2`         | `@uql/core/mysql`    |

For example, for `Postgres`:

```sh
npm install pg --save
```
*(UQL adapters are now included in `@uql/core`)*

3. Additionally, your `tsconfig.json` may need the following flags:

   ```json
   {
     "compilerOptions": {
       "target": "es2022",
       "experimentalDecorators": true,
       "emitDecoratorMetadata": true
     }
   }
   ```

&nbsp;

---

&nbsp;

## 2. Define the entities

Take any class and annotate it with the decorators from `@uql/core`.

```ts
import { v7 as uuidv7 } from 'uuid';
import { Id, Field, Entity } from '@uql/core';

@Entity()
export class User {
  @Id({ onInsert: () => uuidv7() })
  id?: string;

  @Field()
  name?: string;

  @Field({ updatable: false })
  email?: string;

  @Field({ eager: false })
  password?: string;
}
```

&nbsp;

## 3. Setup a querier-pool

A querier-pool can be set in any of the bootstrap files of your app (e.g. in the `server.ts`).

```ts
// file: ./shared/orm.ts
import { PgQuerierPool } from '@uql/core/postgres';
import { SnakeCaseNamingStrategy } from '@uql/core';

export const pool = new PgQuerierPool(
  {
    host: 'localhost',
    user: 'theUser',
    password: 'thePassword',
    database: 'theDatabase',
  },
  {
    logger: console.debug,
    namingStrategy: new SnakeCaseNamingStrategy(),
  },
);
```

&nbsp;

## 4. Manipulate the data

UQL provides multiple ways to interact with your data, from low-level `Queriers` to high-level `Repositories`.

### Using Repositories (Recommended)

```ts
import { GenericRepository } from '@uql/core';
import { User } from './shared/models/index.js';
import { pool } from './shared/orm.js';

// Get a querier from the pool
const querier = await pool.getQuerier();

try {
  const userRepository = new GenericRepository(User, querier);

  const users = await userRepository.findMany({
    $select: { id: true, name: true },
    $where: { email: { $iincludes: '@example.com' } },
    $sort: { createdAt: -1 },
    $limit: 100
  });
} finally {
  // Always release the querier to the pool
  await querier.release();
}
```

### Using Transactions

```ts
import { pool } from './shared/orm.js';
import { User, Profile } from './shared/models/index.js';

const result = await pool.transaction(async (querier) => {
  const user = await querier.findOne(User, { $where: { email: '...' } });
  const profileId = await querier.insertOne(Profile, { userId: user.id, ... });
  return { userId: user.id, profileId };
});
// Connection is automatically released after transaction
```
