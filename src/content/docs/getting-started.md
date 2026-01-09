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

| Feature        | **UQL**                                                             | Traditional ORMs                                        |
| :------------- | :------------------------------------------------------------------ | :------------------------------------------------------ |
| **API**        | **Unified & Intuitive**: Same syntax for SQL & NoSQL.               | Fragmented: SQL and Mongo feel like different worlds.   |
| **Safety**     | **Deep Type-Safety**: Validates relations & operators at any depth. | Surface-level: Often loses types in complex joins.      |
| **Syntax**     | **Serializable JSON**: Pure data, perfect for APIs/Websockets.      | Method-Chaining: Hard to transport over the wire.       |
| **Efficiency** | **Sticky Connections**: Minimal overhead, human-readable SQL.       | Heavy: Often generates "SQL Soup" that's hard to debug. |

&nbsp;

## Features

| Feature                                            | Description                                                                                             |
| :------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| **[Context-Aware Queries](/querying/relations)**   | Deep type-safety for operators and [relations](/querying/relations) at any depth.                       |
| **Serializable JSON**                              | 100% valid JSON queries for easy transport over HTTP/Websockets.                                        |
| **Unified Dialects**                               | Write once, run anywhere: PostgreSQL, MySQL, SQLite, MongoDB, and more.                                 |
| **Naming Strategies**                              | Pluggable system to translate between TypeScript `camelCase` and database `snake_case`.                 |
| **Smart SQL Engine**                               | Optimized sub-queries, placeholders ($1, $2), and minimal SQL generation via `QueryContext`.            |
| **Thread-Safe by Design**                          | Centralized task queue and `@Serialized()` decorator prevent race conditions.                           |
| **Declarative Transactions**                       | Standard `@Transactional()` and `@InjectQuerier()` decorators for NestJS/DI.                            |
| **[Modern & Versatile](/entities/virtual-fields)** | **Pure ESM**, high-res timing, [Soft-delete](/entities/soft-delete), and **Vector/JSONB/JSON** support. |
| **Schema AST Engine**                              | Graph-based schema representation for reliable diffing and circular dependency handling.                |
| **[Migrations & Drift](/migrations)**              | Full CLI suite including automatic generation and **Drift Detection**.                               |
| **[Structured Logging](/logging)**                 | Professional-grade monitoring with slow-query detection and colored output.                             |

&nbsp;

## 1. Install

Install the core package and the driver for your database:

```sh
# Core
npm install @uql/core       # or bun add / pnpm add
```

### Supported Drivers

| Database                                         | Command                      |
| :----------------------------------------------- | :--------------------------- |
| **PostgreSQL** (incl. Neon, Cockroach, Yugabyte) | `npm install pg`             |
| **MySQL** (incl. TiDB, Aurora)                   | `npm install mysql2`         |
| **MariaDB**                                      | `npm install mariadb`        |
| **SQLite**                                       | `npm install better-sqlite3` |
| **LibSQL** (incl. Turso)                         | `npm install @libsql/client` |
| **MongoDB**                                      | `npm install mongodb`        |
| **Cloudflare D1**                                | _Native (no driver needed)_  |

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

:::tip
UQL works best with `target` set to `ES2020` or higher to leverage modern JavaScript features and high-resolution timing.
:::

---

&nbsp;

## 2. Define the entities

Annotate your classes with decorators from `@uql/core`. UQL's engine uses this metadata for both type-safe querying and precise DDL generation.

### Core Decorators

| Decorator     | Purpose                                                                      |
| :------------ | :--------------------------------------------------------------------------- |
| `@Entity()`   | Marks a class as a database table/collection.                                |
| `@Id()`       | Defines the Primary Key with support for `onInsert` generators (UUIDs, etc). |
| `@Field()`    | Standard column. Use `{ reference: ... }` for Foreign Keys.                  |
| `@Index()`    | Defines a composite or customized index on one or more columns.              |
| `@OneToOne`   | Defines a one-to-one relationship.                                           |
| `@OneToMany`  | Defines a one-to-many relationship.                                          |
| `@ManyToOne`  | Defines a many-to-one relationship.                                          |
| `@ManyToMany` | Defines a many-to-many relationship.                                         |

### Type Abstraction: Logical vs. Physical

UQL separates the **intent** of your data from its **storage**. Both properties are **optional**; if omitted, UQL performs a *best-effort inference* using the TypeScript types from your class (provided `emitDecoratorMetadata` is enabled).

| Property         | Purpose                                                                                                   | Values                                                                                                           |
| :--------------- | :-------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| **`type`**       | **Logical Type** (Abstraction). Used for runtime behavior and automatic SQL mapping.                      | `String`, `Number`, `Boolean`, `Date`, `BigInt`, or semantic strings: `'uuid'`, `'json'`, `'jsonb'`, `'vector'`. |
| **`columnType`** | **Physical Type** (Implementation). **Highest Priority**. Bypasses UQL's inference for exact SQL control. | Raw SQL types: `'varchar(100)'`, `'decimal(10,2)'`, `'smallint'`, etc.                                           |

```ts
@Field() // Inference: Maps to TEXT (Postgres) or VARCHAR(255) (MySQL) automatically.
name?: string;

@Field({ type: 'uuid' }) // Recommended: Cross-database abstraction for UUIDs.
id?: string;

@Field({ columnType: 'varchar(500)' }) // Control: Explicitly forces a specific SQL type.
bio?: string;
```

&nbsp;

```ts
import { v7 as uuidv7 } from 'uuid';
import { Entity, Id, Field, Index, OneToOne, OneToMany, ManyToOne, ManyToMany, type Relation } from '@uql/core';

@Entity()
export class User {
  @Id({ type: 'uuid', onInsert: () => uuidv7() })
  id?: string;

  @Field({ unique: true, comment: 'User login email' }) // Unique index
  email?: string;

  @Index(['firstName', 'lastName']) // Composite index on multiple columns
  @Field()
  firstName?: string;

  @Field()
  lastName?: string;

  @OneToOne({
    entity: () => Profile,
    mappedBy: (profile) => profile.user,
    cascade: true,
  })
  profile?: Relation<Profile>;

  @OneToMany({
    entity: () => Post,
    mappedBy: (post) => post.author,
  })
  posts?: Relation<Post>[];
}

@Entity()
export class Profile {
  @Id({ type: 'uuid', onInsert: () => uuidv7() })
  id?: string;

  @Field()
  bio?: string;

  @Field({ reference: () => User, foreignKey: 'fk_profile_user' })
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

  @ManyToMany({
    entity: () => Tag,
    through: () => PostTag,
  })
  tags?: Tag[];
}

@Entity()
export class Tag {
  @Id({ type: 'uuid', onInsert: () => uuidv7() })
  id?: string;

  @Field()
  name?: string;
}

@Entity()
export class PostTag {
  @Id({ type: 'uuid', onInsert: () => uuidv7() })
  id?: string;

  @Field({ reference: () => Post })
  postId?: number;

  @Field({ reference: () => Tag })
  tagId?: string;
}
```

:::tip
Use the `Relation<T>` utility type for relationship properties. It prevents TypeScript circular dependency errors while maintaining full type-safety.
:::

&nbsp;

## 3. Set up a pool

A pool manages connections (queriers). We recommend creating a `uql.config.ts` file to share the configuration between your application and the CLI.

```ts
// file: uql.config.ts
import { SnakeCaseNamingStrategy, type Config } from '@uql/core';
import { PgQuerierPool } from '@uql/core/postgres';
import { User, Profile, Post, Tag, PostTag } from './entities';

export const pool = new PgQuerierPool(
  { host: 'localhost', database: 'uql_app', max: 10 },
  {
    logger: ['error', 'warn', 'migration'],
    slowQueryThreshold: 1000,
    namingStrategy: new SnakeCaseNamingStrategy()
  }
);

export default {
  pool,
  entities: [User, Profile, Post, Tag, PostTag],
  migrationsPath: './migrations',
} satisfies Config;
```

:::tip
Reusing the same `pool` instance for both your application and migrations ensures consistent settings (like naming strategies) and reduces connection overhead.
:::

---

&nbsp;

## 4. Manipulate the data

UQL provides a straightforward API to interact with your data using `Queriers`. Always remember to release the querier back to the pool when done.

```ts
import { User } from './entities/index.js';
import { pool } from './uql.config.js';

// 1. Obtain a querier from the pool
const querier = await pool.getQuerier();

try {
  // 2. Perform operations
  const users = await querier.findMany(User, {
    $select: {
      name: true,
      profile: { $select: ['bio'], $required: true } // INNER JOIN
    },
    $where: {
      name: { $istartsWith: 'a' }, // Case-insensitive search
      status: 'active'
    },
    $limit: 10,
  });
} finally {
  // 3. Always release the querier
  await querier.release();
}
```

**Generated SQL (PostgreSQL):**

```sql
SELECT "User"."name", "profile"."id" AS "profile_id", "profile"."bio" AS "profile_bio"
FROM "User"
INNER JOIN "Profile" AS "profile" ON "profile"."userId" = "User"."id"
WHERE "User"."name" ILIKE 'a%' AND "User"."status" = 'active'
LIMIT 10
```

### Thread-Safe Transactions

For data modifications or multi-step operations, use declarative transactions to ensure safety and automatic resource management.

```ts
import { pool } from './uql.config.js';
import { User, Profile } from './entities/index.js';

const result = await pool.transaction(async (querier) => {
  const user = await querier.findOne(User, { $where: { email: '...' } });
  const profileId = await querier.insertOne(Profile, { userId: user.id, bio: '...' });
  return { userId: user.id, profileId };
});
// Querier is automatically released after the transaction
```

&nbsp;

## 5. Migrations & Synchronization

UQL includes a robust migration system and an Entity-First auto-synchronization engine built directly into the core.

### 1. Unified Configuration (Recommended)

As shown in [step 3](#3-set-up-a-pool), using a single `uql.config.ts` for both your app and the CLI is recommended for consistency. It enforces a Single Source of Truth for your database connection and schema.

### 2. Manage via CLI

Use the CLI to manage your database schema evolution.

| Command                    | Description                                                                             |
| :------------------------- | :-------------------------------------------------------------------------------------- |
| `generate <name>`          | Creates an empty timestamped file for **manual** SQL migrations (e.g., data backfills). |
| `generate:entities <name>` | **Auto-generates** a migration by diffing your entities against the current DB schema.  |
| `generate:from-db`         | **Scaffolds Entities** from an existing database. Includes **Smart Relation Detection**. |
| `drift:check`              | **Drift Detection**: Compares your entities vs. actual DB schema to ensure production safety. |
| `up`                       | Applies all pending migrations.                                                         |
| `down`                     | Rolls back the last applied migration batch.                                            |
| `status`                   | Shows which migrations have been executed and which are pending.                        |

```bash
# Create a manual migration
npx uql-migrate generate seed_default_roles

# Auto-generate schema changes from your code
npx uql-migrate generate:entities add_profile_table

# Apply changes
npx uql-migrate up

# Revert changes if needed
npx uql-migrate down

# Run with custom config
npx uql-migrate up --config ./configs/uql.config.ts
```

:::caution[Bun Users]
If your `uql.config.ts` uses TypeScript path aliases (e.g., `~app/...`), run migrations with the `--bun` flag to ensure proper resolution:
```bash
bun run --bun uql-migrate status
```
Or add a script to your `package.json`: `"uql": "bun run --bun uql-migrate"`, then run commands like `bun run uql status`.
:::

### 3. Entity-First Synchronization (Development)

We recommend using `autoSync` in development to automatically keep your database in sync with your entities. It is **safe by default**, meaning it only adds missing tables and columns, blocking any destructive operations.

:::note[Important]
For `autoSync` to detect your entities, they must be **loaded** (imported) before calling `autoSync`.
:::

**Using Your Config (Recommended)**

If you follow the unified configuration pattern, your entities are already imported. Simply reuse it:

```ts
import { Migrator } from '@uql/core/migrate';
import config from './uql.config.js';

const migrator = new Migrator(config.pool, {
  entities: config.entities,
});
await migrator.autoSync({ logging: true });
```

**Explicit Entities**

Alternatively, pass entities directly:

```ts
import { Migrator } from '@uql/core/migrate';
import { User, Profile, Post } from './entities/index.js';
import { pool } from './uql.config.js';

const migrator = new Migrator(pool, {
  entities: [User, Profile, Post],
});
await migrator.autoSync({ logging: true });
```

Check out the full [documentation](/migrations) for detailed CLI commands and advanced usage.

&nbsp;

## Built with ❤️ and supported by

UQL is an open-source project driven by the community and proudly sponsored by **[Variability.ai](https://variability.ai)**.

> "Video Intelligence in Every Fluctuation"

Their support helps us maintain and evolve the "Smartest ORM" for developers everywhere. Thank you for being part of our journey!
