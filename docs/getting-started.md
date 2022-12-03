---
weight: 1
root: true
---

`nukak` is a flexible and efficient `ORM`, with declarative `JSON` syntax and really smart type-safety.

The `nukak` queries can be safely written in the frontend (browser/mobile) and sent to the backend; or only use `nukak` in the backend, or even in a mobile app with an embedded database (like `sqlite`).

## Features

- `JSON` (serializable) syntax for all the [queries](https://nukak.org/docs/querying-logical-operators).
- uses the power of `TypeScript` to get smart type-safety [everywhere](https://nukak.org/docs/api-repository).
- the generated queries are [performant](https://nukak.org/docs/querying-retrieve-relations), safe, and human-readable.
- `$project`, `$filter`, `$sort`, `$limit` works at [multiple levels](https://nukak.org/docs/querying-retrieve-relations) (including deep relations and their fields).
- [declarative](https://nukak.org/docs/transactions-declarative) and [imperative](https://nukak.org/docs/transactions-imperative) `transactions`.
- [soft-delete](https://nukak.org/docs/entities-soft-delete), [virtual fields](https://nukak.org/docs/entities-virtual-fields), [repositories](https://nukak.org/docs/api-repository), `connection pooling`.
- transparent support for [inheritance](https://nukak.org/docs/entities-advanced) between entities.
- supports `MySQL`, `MariaDB`, `SQLite`, `Postgres`, `MongoDB`.

## Install

1. Install the core package:

   ```sh
   npm install nukak --save
   ```

2. Install one of the specific adapters for your database:

| Database     | Driver           | Nukak Adapter    |
| ------------ | ---------------- | ---------------- |
| `MySQL`      | `mysql2`         | `nukak-mysql`    |
| `MariaDB`    | `mariadb`        | `nukak-maria`    |
| `SQLite`     | `sqlite sqlite3` | `nukak-sqlite`   |
| `PostgreSQL` | `pg`             | `nukak-postgres` |
| `MongoDB`    | `mongodb`        | `nukak-mongo`    |

For example, for `Postgres`:

```sh
npm install pg nukak-postgres --save
```

3. Additionally, your `tsconfig.json` may need the following flags:

   ```json
   "target": "es2020",
   "experimentalDecorators": true,
   "emitDecoratorMetadata": true
   ```

## Configure

A default querier-pool can be set in any of the bootstrap files of your app (e.g. in the `server.ts`).

```ts
import { setQuerierPool } from 'nukak';
import { PgQuerierPool } from 'nukak-postgres';

export const querierPool = new PgQuerierPool(
  {
    host: 'localhost',
    user: 'theUser',
    password: 'thePassword',
    database: 'theDatabase',
  },
  // optionally, a logger can be passed to log the generated SQL queries
  { logger: console.log }
);

// the default querier pool that `nukak` will use
setQuerierPool(querierPool);
```

## Define the entities

Take any dump class (aka DTO) and annotate it with the decorators from `nukak/entity`.

```ts
import { v4 as uuidv4 } from 'uuid';
import { Id, Field, Entity } from 'nukak/entity/index.js';

@Entity()
export class User {
  @Id({ onInsert: uuidv4 })
  id?: string;
  @Field()
  name?: string;
  @Field()
  email?: string;
  @Field()
  password?: string;
}
```

## Manipulate the data

```ts
import { getQuerier } from 'nukak';
import { User } from './shared/models/index.js';

async function findLastUsers(limit = 10) {
  const querier = await getQuerier();
  const users = await querier.findMany(User, {
    $project: ['id', 'name', 'email'],
    $sort: { createdAt: -1 },
    $limit: limit,
  });
  await querier.release();
  return users;
}

async function createUser(body: User) {
  const querier = await getQuerier();
  const id = await querier.insertOne(User, body);
  await querier.release();
  return id;
}
```
