---
title: Getting Started
sidebar:
  order: 1
root: true
description: This tutorial explain the features of the UQL orm and how to use get started with it.
---


**[UQL](/)** is the [smartest ORM](https://medium.com/@rogerpadillac/in-search-of-the-perfect-orm-e01fcc9bce3d) for TypeScript. It is engineered to be **fast**, **safe**, and **universally compatible**.

- **Runs Everywhere**: Node.js, Bun, Deno, Cloudflare Workers, Electron, React Native, and even the Browser.
- **Unified API**: A consistent, expressive query interface for PostgreSQL, MySQL, MariaDB, SQLite, LibSQL, Neon, Cloudflare D1, and MongoDB (inspired by its glorious syntax).

&nbsp;

```ts
const users = await querier.findMany(User, {
  $select: { email: true, profile: { $select: { picture: true } } },
  $where: { email: { $endsWith: '@domain.com' } },
  $sort: { createdAt: 'desc' },
  $limit: 100,
});
```

&nbsp;

## Why UQL?

| Feature | **UQL** | Traditional ORMs |
| :--- | :--- | :--- |
| **API** | **Unified & Intuitive**: Same syntax for SQL & NoSQL. | Fragmented: SQL and Mongo feel like different worlds. |
| **Safety** | **Deep Type-Safety**: Validates relations & operators at any depth. | Surface-level: Often loses types in complex joins. |
| **Syntax** | **Serializable JSON**: Pure data, perfect for APIs/Websockets. | Method-Chaining: Hard to transport over the wire. |
| **Efficiency** | **Sticky Connections**: Minimal overhead, human-readable SQL. | Heavy: Often generates "SQL Soup" that's hard to debug. |

&nbsp;

## Features

| Feature | Description |
| :--- | :--- |
| **[Context-Aware Queries](/querying/relations)** | Deep type-safety for operators and [relations](/querying/relations) at any depth. |
| **Serializable JSON** | 100% valid JSON queries for easy transport over HTTP/Websockets. |
| **Unified Dialects** | Write once, run anywhere: PostgreSQL, MySQL, SQLite, MongoDB, and more. |
| **Naming Strategies** | Pluggable system to translate between TypeScript `camelCase` and database `snake_case`. |
| **Smart SQL Engine** | Optimized sub-queries, placeholders ($1, $2), and minimal SQL generation via `QueryContext`. |
| **Thread-Safe by Design** | Centralized task queue and `@Serialized()` decorator prevent race conditions. |
| **Declarative Transactions** | Standard `@Transactional()` and `@InjectQuerier()` decorators for NestJS/DI. |
| **[Modern & Versatile](/entities/virtual-fields)** | **Pure ESM**, high-res timing, [Soft-delete](/entities/soft-delete), and **Vector/JSONB/JSON** support. |
| **[Structured Logging](/logging)** | Professional-grade monitoring with slow-query detection and colored output. |

&nbsp;

## 1. Install

Install the core package and the driver for your database:

```sh
# Core
npm install @uql/core       # or bun add / pnpm add

# Potential Drivers (choose only ONE!)
npm install pg              # PostgreSQL / Neon / Cockroach / Yugabyte
npm install mysql2          # MySQL / TiDB / Aurora
npm install mariadb         # MariaDB
npm install better-sqlite3  # SQLite
npm install @libsql/client  # LibSQL / Turso
npm install mongodb         # MongoDB
# Cloudflare D1 uses native bindings (no extra driver needed)
```

### TypeScript Configuration

Ensure your `tsconfig.json` is configured to support decorators and metadata:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "module": "NodeNext",
    "target": "ESNext"
  }
}
```

---

&nbsp;

## 2. Define the entities

Annotate your classes with decorators from `@uql/core`. UQL supports detailed schema metadata for precise DDL generation.

```ts
import { v7 as uuidv7 } from 'uuid';
import { Entity, Id, Field, OneToOne, OneToMany, ManyToOne, ManyToMany, type Relation } from '@uql/core';

@Entity()
export class User {
  @Id({ onInsert: () => uuidv7() })
  id?: string;

  @Field({ length: 100, index: true })
  name?: string;

  @Field({ unique: true, comment: 'User login email' })
  email?: string;

  > **Pro Tip**: Use the `Relation<T>` utility type for relationship properties. It prevents TypeScript circular dependency errors while maintaining full type-safety.
>
> **Note**: For `string` fields, UQL uses dialect-aware defaults if no `length` is specified: `TEXT` for PostgreSQL/SQLite (optimal) and `VARCHAR(255)` for MySQL/MariaDB (compatibility).
  @OneToOne({ entity: () => Profile, mappedBy: 'user', cascade: true })
  profile?: Relation<Profile>; // Relation<T> handles circular dependencies

  @OneToMany({ entity: () => Post, mappedBy: 'author' })
  posts?: Relation<Post>[];
}

@Entity()
export class Profile {
  @Id({ onInsert: () => uuidv7() })
  id?: string;

  @Field()
  bio?: string;

  @Field({ reference: () => User })
  userId?: string;

  @OneToOne({ entity: () => User })
  user?: User;
}

@Entity()
export class Post {
  @Id()
  id?: number;

  @Field()
  title?: string;

  @Field({ reference: () => User })
  authorId?: string;

  @ManyToOne({ entity: () => User })
  author?: User;

  @ManyToMany({ entity: () => Tag, through: () => PostTag })
  tags?: Tag[];
}

@Entity()
export class Tag {
  @Id({ onInsert: () => uuidv7() })
  id?: string;

  @Field()
  name?: string;
}

@Entity()
export class PostTag {
  @Id({ onInsert: () => uuidv7() })
  id?: string;

  @Field({ reference: () => Post })
  postId?: number;

  @Field({ reference: () => Tag })
  tagId?: string;
}
```

&nbsp;

## 3. Set up a pool (of queriers)

A pool is an abstraction that manages connections (queriers) to your database. A querier is an abstraction that represents a connection to the database.

The pool can be set in any of the bootstrap files of your app (e.g., in `server.ts`).

### Available built-in QuerierPool classes per database

| Database | QuerierPool class
| :--- | :---
| `PostgreSQL` (incl. CockroachDB, YugabyteDB) | `@uql/core/postgres/PgQuerierPool`
| `MySQL` (incl. TiDB, Aurora) | `@uql/core/mysql/Mysql2QuerierPool`
| `MariaDB` | `@uql/core/maria/MariadbQuerierPool`
| `SQLite` | `@uql/core/sqlite/SqliteQuerierPool`
| `Cloudflare D1` | `@uql/core/d1/D1QuerierPool`
| `LibSQL` (Turso) | `@uql/core/libsql/LibsqlQuerierPool`
| `Neon` (Serverless Postgres) | `@uql/core/neon/NeonQuerierPool`

### Example of setting up a pool for PostgreSQL

```ts
// file: ./shared/orm.ts
import { SnakeCaseNamingStrategy } from '@uql/core';
import { PgQuerierPool } from '@uql/core/postgres';

export const pool = new PgQuerierPool(
  {
    host: 'localhost',
    user: 'theUser',
    password: 'thePassword',
    database: 'theDatabase',
    min: 1,
    max: 10,
  },
  // Extra options (optional).
  {
    // Enable logging (true uses the DefaultLogger with colored output).
    logger: true,
    // Threshold in milliseconds to log slow queries.
    slowQueryThreshold: 200,
    // Pass a naming strategy here (optional, by default no automatic names translation).
    // E.g. `SnakeCaseNamingStrategy` automatically translate between TypeScript camelCase and database snake_case.
    namingStrategy: new SnakeCaseNamingStrategy()
  },
);
```

&nbsp;

## 4. Manipulate the data

UQL provides a straightforward API to interact with your data using `Queriers`.

```ts
import { User } from './shared/models/index.js';
import { pool } from './shared/orm.js';

// Get a querier from the pool
const querier = await pool.getQuerier();

try {
  // Advanced querying with relations and virtual fields
  const users = await querier.findMany(User, {
    $select: {
      id: true,
      name: true,
      profile: ['picture'], // Select specific fields from a 1-1 relation
      tagsCount: true       // Virtual field (calculated at runtime)
    },
    $where: {
      email: { $iincludes: '@example.com' }, // Case-insensitive search
      status: 'active'
    },
    $sort: { createdAt: 'desc' },
    $skip: 10
    $limit: 10,
  });
} finally {
  // Always release the querier to the pool
  await querier.release();
}
```

### Advanced: Deep Selection & Filtering

UQL's query syntax is context-aware. When you query a relation, the available fields and operators are automatically suggested and validated based on that related entity.

```ts
import { pool } from './shared/orm.js';
import { User } from './shared/models/index.js';

const querier = await pool.getQuerier();

try {
  const authorsWithPopularPosts = await querier.findMany(User, {
    $select: {
      id: true,
      name: true,
      profile: {
        $select: ['bio'],
        // Filter related record and enforce INNER JOIN
        $where: { bio: { $ne: null } },
        $required: true
      },
      posts: {
        $select: ['title', 'createdAt'],
        // Filter the related collection directly
        $where: { title: { $iincludes: 'typescript' } },
        $sort: { createdAt: 'desc' },
      }
    },
    $where: {
      name: { $istartsWith: 'a' }
    }
  });
} finally {
  await querier.release();
}
```

### Advanced: Virtual Fields & Raw SQL

Define complex logic directly in your entities using `raw` functions from `uql/util`. These are highly efficient as they are resolved during SQL generation.

```ts
import { v7 as uuidv7 } from 'uuid';
import { Entity, Id, Field, raw } from '@uql/core';
import { ItemTag } from './shared/models/index.js';

@Entity()
export class Item {
  @Id()
  id: number;

  @Field()
  name: string;

  @Field({
    virtual: raw(({ ctx, dialect, escapedPrefix }) => {
      ctx.append('(');
      dialect.count(ctx, ItemTag, {
        $where: {
          itemId: raw(({ ctx }) => ctx.append(`${escapedPrefix}.id`))
        }
      }, { autoPrefix: true });
      ctx.append(')');
    })
  })
  tagsCount?: number;
}
```

### Thread-Safe Transactions

UQL ensures your operations are serialized and thread-safe.

```ts
import { pool } from './shared/orm.js';
import { User, Profile } from './shared/models/index.js';

const result = await pool.transaction(async (querier) => {
  const user = await querier.findOne(User, { $where: { email: '...' } });
  const profileId = await querier.insertOne(Profile, { userId: user.id, ... });
  return { userId: user.id, profileId };
});
// Connection is automatically released after a transaction.
```

&nbsp;

## 5. Migrations & Synchronization

UQL includes a robust *migration system* and an *Entity-First auto-synchronization* engine built directly into the core.

### 1. Unified Configuration (Recommended)

Ideally, use the same `uql.config.ts` for your application bootstrap and the CLI:

```typescript
// uql.config.ts
import type { Config } from '@uql/core';
import { PgQuerierPool } from '@uql/core/postgres';

export default {
  pool: new PgQuerierPool({ /* config */ }),
  // Optional: UQL automatically loads all classes decorated with @Entity.
  // entities: [User, Post],
  migrationsPath: './migrations',
} satisfies Config;
```

**Why?** Using a single config for both your app and the CLI is recommended for consistency. It prevents bugs where your runtime uses one naming strategy (e.g. `camelCase`) but your migrations use another (e.g. `snake_case`). It enforces a Single Source of Truth for your database connection and schema.

### 2. Manage via CLI

UQL provides a dedicated CLI tool for migrations.

```bash
# Generate a migration by comparing entities vs database
npx uql-migrate generate:entities initial_schema
# or
bunx uql-migrate generate:entities initial_schema

# Run pending migrations
npx uql-migrate up
# or
bunx uql-migrate up

# Rollback the last migration
npx uql-migrate down
# or
bunx uql-migrate down

# Check status
npx uql-migrate status
# or
bunx uql-migrate status
```

### 3. Entity-First Synchronization (recommended for development)

We recommend using `autoSync` (in development) to automatically keep your database in sync with your entities, eliminating the need for manual migrations. It is **safe by default**, meaning it only adds missing tables and columns.

```ts
import { Migrator } from '@uql/core/migrate';
import { pool } from './shared/orm.js';

// The Migrator will automatically load all classes decorated with @Entity by default.
const migrator = new Migrator(pool);
await migrator.autoSync({ logging: true });
```

Check out the full [documentation](/migrations) for detailed CLI commands and advanced usage.

&nbsp;

## Built with ❤️ and supported by

UQL is an open-source project driven by the community and proudly sponsored by **[Variability.ai](https://variability.ai)**.

> "Video Intelligence in Every Fluctuation"

Their support helps us maintain and evolve the "Smartest ORM" for developers everywhere. Thank you for being part of our journey!
