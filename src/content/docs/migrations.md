---
sidebar:
  order: 150
title: Migrations Overview
description: This tutorial explain how to use database migrations with UQL.
---

## Database Migrations

UQL includes a robust migration system and an "Entity-First" synchronization engine built directly into the core.

### 1. Unified Configuration

Ideally, reuse the same `uql.config.ts` for both your application bootstrap and the CLI. This ensures your app and migrations share the same settings (like [Naming Strategies](/naming-strategy)).

```typescript
// uql.config.ts
import type { Config } from '@uql/core';
import { PgQuerierPool } from '@uql/core/postgres';
import { User, Post } from './entities';

export default {
  pool: new PgQuerierPool({ 
    host: 'localhost',
    user: 'theUser',
    password: 'thePassword',
    database: 'theDatabase'
  }),
  entities: [User, Post],
  migrationsPath: './migrations',
} satisfies Config;
```

By default, the CLI looks for `uql.config.ts` in the project root, but you can specify a custom path using the `--config` / `-c` flag.

### 2. Manage via CLI

Use the CLI to manage your database schema evolution.

| Command                    | Description                                                                             |
| :------------------------- | :-------------------------------------------------------------------------------------- |
| `generate <name>`          | Creates an empty timestamped file for **manual** SQL migrations (e.g., data backfills). |
| `generate:entities <name>` | **Auto-generates** a migration by diffing your entities against the current DB schema.  |
| `up`                       | Applies all pending migrations.                                                         |
| `down`                     | Rolls back the last applied migration batch.                                            |
| `status`                   | Shows which migrations have been executed and which are pending.                        |

```bash
# Create a manual migration
npx uql-migrate generate add_users_table

# Generate a migration by comparing entities vs database
npx uql-migrate generate:entities initial_schema

# Run all pending migrations
npx uql-migrate up

# Rollback the last migration
npx uql-migrate down

# Using a custom config path
npx uql-migrate up --config ./configs/uql.config.ts

# Check status of migrations
npx uql-migrate status
```

:::caution[Bun Users]
If your `uql.config.ts` uses TypeScript path aliases (e.g., `~app/...`), run migrations with the `--bun` flag to ensure proper resolution:
```bash
bun run --bun uql-migrate status
```
Or add a script to your `package.json`: `"uql": "bun run --bun uql-migrate"`.
:::

### 3. Entity-First Synchronization (Development)

In development, you can use `autoSync` to automatically keep your database in sync with your entities without manual migrations. It uses **semantic type comparison** to avoid unnecessary alterations and is **safe by default**, meaning it only adds missing tables and columns while **blocking** any destructive operations (column drops or type alterations) to prevent data loss.

:::note[Important]
For `autoSync` to detect your entities, they must be **loaded** (imported) before calling `autoSync`.
:::

**Using Your Config (Recommended)**

```ts
import { Migrator } from '@uql/core/migrate';
import config from './uql.config.js';

const migrator = new Migrator(config.pool, {
  entities: config.entities,
});

// Automatically add missing tables and columns
await migrator.autoSync({ logging: true });
```

**Explicit Entities**

```ts
import { Migrator } from '@uql/core/migrate';
import { User, Profile, Post } from './entities/index.js';
import { pool } from './uql.config.js';

const migrator = new Migrator(pool, {
  entities: [User, Profile, Post],
});
await migrator.autoSync({ logging: true });
```

### Schema Generation Details

UQL's schema generator includes several intelligent features:

- **64-bit Primary Keys**: Auto-increment primary keys use `BIGINT` across all dialects for TypeScript `number` compatibility.
- **SQLite STRICT Mode**: Tables generated for SQLite, LibSQL, and Cloudflare D1 use **STRICT mode** by default.
- **Semantic Type Comparison**: Understands dialect-specific aliases (e.g., `INTEGER` vs `INT`) to avoid phantom diffs.
- **Safe Primary Keys**: Primary keys are immune to automated alterations during `autoSync`.
- **Foreign Key Inheritance**: Foreign key columns automatically inherit the exact SQL type of their referenced primary keys.

Check out the [getting started](/getting-started) guide for more details on setting up your project.
