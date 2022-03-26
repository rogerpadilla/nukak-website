---
weight: 10
---

# Quick Start

`uql` is a flexible and efficient `ORM`, with declarative `JSON` syntax and really smart type-safety.

The `uql` queries can be safely written in the frontend (browser/mobile) and sent to the backend; or only use `uql` in the backend, or even in a mobile app with an embedded database (like `sqlite`).

## <a name="features"></a> Features

- `JSON` (serializable) syntax for all the queries.
- uses the power of `TypeScript` to get (smart) type-safety everywhere.
- the generated queries are performant, safe, and human-readable.
- `$project`, `$filter`, `$sort`, `$limit` works at multiple levels (including deep relations and their fields).
- declarative and imperative `transactions`.
- `soft-delete`, `virtual fields`, `repositories`, `connection pooling`.
- transparent support for `inheritance` patterns between entities.
- supports `Postgres`, `MySQL`, `MariaDB`, `SQLite`, `MongoDB` (beta).

## <a name="installation"></a> Installation

1. Install the core package:

   ```sh
   npm install @uql/core --save
   ```

   or

   ```sh
   yarn add @uql/core
   ```

2. Install one of the specific packages according to your database:

   | Database     | Package         |
   | ------------ | --------------- |
   | `MySQL`      | `@uql/mysql`    |
   | `PostgreSQL` | `@uql/postgres` |
   | `MariaDB`    | `@uql/maria`    |
   | `MongoDB`    | `@uql/mongo`    |
   | `SQLite`     | `@uql/sqlite`   |

   E.g. for `PostgreSQL`

   ```sh
   npm install @uql/postgres --save
   ```

   or with _yarn_

   ```sh
   yarn add @uql/postgres
   ```

3. Additionally, your `tsconfig.json` may need the following flags:

   ```json
   "target": "es6", // or a more recent ecmascript version.
   "experimentalDecorators": true,
   "emitDecoratorMetadata": true
   ```

## <a name="configuration"></a> Configuration

A default querier-pool can be set in any of the bootstrap files of your app (e.g. in the `server.ts`).

```ts
import { setDefaultQuerierPool } from '@uql/core';
import { PgQuerierPool } from '@uql/postgres';

const querierPool = new PgQuerierPool(
  {
    host: 'localhost',
    user: 'theUser',
    password: 'thePassword',
    database: 'theDatabase',
  },
  // a logger can optionally be passed so the SQL queries are logged
  console.log
);

setDefaultQuerierPool(querierPool);
```

## <a name="definition-of-entities"></a> Definition of Entities

Take any dump class (aka DTO) and annotate it with the decorators from `'@uql/core/entity'`.

```ts
import { v4 as uuidv4 } from 'uuid';
import { Field, ManyToOne, Id, OneToMany, Entity, OneToOne, ManyToMany } from '@uql/core/entity';

@Entity()
export class Profile {
  /**
   * primary-key.
   * the `onInsert` callback can be used to specify a custom mechanism for auto-generating
   * the default value of a field when inserting a new record.
   */
  @Id({ onInsert: uuidv4 })
  id?: string;
  @Field()
  picture?: string;
  /**
   * foreign-keys are really simple to specify.
   */
  @Field({ reference: () => User })
  creatorId?: string;
}

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
  /**
   * `mappedBy` can be a callback or a string (callback is useful for auto-refactoring).
   */
  @OneToOne({ entity: () => Profile, mappedBy: (profile) => profile.creatorId, cascade: true })
  profile?: Profile;
}

@Entity()
export class MeasureUnitCategory {
  @Id({ onInsert: uuidv4 })
  id?: string;
  @Field()
  name?: string;
  @OneToMany({ entity: () => MeasureUnit, mappedBy: (measureUnit) => measureUnit.category })
  measureUnits?: MeasureUnit[];
}

@Entity()
export class MeasureUnit {
  @Id({ onInsert: uuidv4 })
  id?: string;
  @Field()
  name?: string;
  @Field({ reference: () => MeasureUnitCategory })
  categoryId?: string;
  @ManyToOne({ cascade: 'persist' })
  category?: MeasureUnitCategory;
}
```

## <a name="creation-of-queries"></a> Creation of Queries

```ts
import { getQuerier, getRepository } from '@uql/core';
import { User } from './entity';

const querier = await getQuerier();

const users = await querier.findMany(User, {
  $project: { id: true, email: true, profile: ['id', 'picture'] },
  $filter: { email: { $iendsWith: '@google.com' } },
  $sort: { createdAt: -1 },
  $limit: 100,
});

await querier.release();
```
