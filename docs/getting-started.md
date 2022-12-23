---
weight: 1
root: true
---

![code](/code.webp 'code')

Powerful [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) for [TypeScript](http://www.typescriptlang.org) and modern `JavaScript` ideated to be fast, safe, and simple to plug into any application. Inspired by other ORMs such as [TypeORM](https://typeorm.io) and [Mongo driver](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/).

&nbsp;

## Features

- Serializable queries: the [syntax](https://nukak.org/docs/querying-logical-operators) is valid `JSON` allowing the queries to be transported across platforms with ease, squeezing the strengths of `TypeScript` & modern `JavaScript`.
- Type-safe queries: `TypeScript` auto-completes and validates the [queries](https://nukak.org/docs/querying-comparison-operators) while coding.
- Context-aware queries: `TypeScript` infers the appropriate operators on any level of the query, [including relations and their fields](https://www.nukak.org/docs/querying-relations).
- High performance: the [generated queries](https://www.nukak.org/docs/querying-logical-operators) are fast, safe, and human-readable.
- Combines the best elements of `OOP` (Object Oriented Programming) and `FP` (Functional Programming).
- [Declarative](https://nukak.org/docs/transactions-declarative) and [imperative](https://nukak.org/docs/transactions-imperative) `transactions` for flexibility, and `connection pooling` for scalability.
- Modern [Pure ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) packages. `ESM` is natively supported by Node.js 12 and later.
- [soft-delete](https://nukak.org/docs/entities-soft-delete), [virtual fields](https://nukak.org/docs/entities-virtual-fields), [repositories](https://nukak.org/docs/querying-repository).
- Supports the Data Mapper pattern for maintainability.
- Transparent support for [inheritance between entities](https://nukak.org/docs/entities-inheritance).
- Unified syntax across Databases: providing a standard `API` and transparently transforming queries according to the configured database.

&nbsp;

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

&nbsp;

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

&nbsp;

## Define the entities

Take any dump class (aka DTO) and annotate it with the decorators from `nukak/entity`.

```ts
/**
 * Any class can be annotated with this decorator to make it works as
 * an entity.
 */
@Entity()
export class User {
  /**
   * an entity should specify an ID Field, its name and type are automatically detected.
   * the `onInsert` property can be used to specify a custom mechanism for
   * auto-generating the primary-key's value when inserting.
   */
  @Id({ onInsert: uuidv4 })
  id?: string;

  /**
   * the properties of the class can be annotated with this decorator so they
   * are interpreted as a column, its name and type are automatically detected.
   */
  @Field()
  name?: string;

  @Field()
  email?: string;

  @Field()
  password?: string;
}
```

&nbsp;

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
