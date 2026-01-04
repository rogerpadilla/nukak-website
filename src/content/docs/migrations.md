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

export default {
  pool: new PgQuerierPool({ 
    host: 'localhost',
    user: 'theUser',
    password: 'thePassword',
    database: 'theDatabase'
  }),
  // Optional: UQL automatically loads all classes decorated with @Entity.
  // entities: [User, Post],
  migrationsPath: './migrations',
} satisfies Config;
```


By default, the CLI looks for `uql.config.ts` in the project root, but you can specify a custom path using the `--config` flag.

### 2. Manage via CLI

UQL provides a dedicated CLI tool for migrations.

```bash
# Generate a new empty migration file
npx uql-migrate generate add_users_table

# Generate a migration by comparing entities vs database
npx uql-migrate generate:entities initial_schema

# Run all pending migrations
npx uql-migrate up

# Rollback the last migration
npx uql-migrate down

# Sync schema directly (development only! - drops/recreates if --force is used)
npx uql-migrate sync

# Using a custom config path
npx uql-migrate up --config ./configs/uql.config.ts

# Check status of migrations
npx uql-migrate status
```

### 3. Entity-First Synchronization (Development)

In development, you can use `autoSync` to automatically keep your database in sync with your entities without manual migrations. It uses **semantic type comparison** to avoid unnecessary alterations and is **safe by default**, meaning it only adds missing tables and columns.

```ts
import { Migrator } from '@uql/core/migrate';
import { pool } from './uql.config.js';

// The Migrator will automatically load all classes decorated with @Entity by default.
const migrator = new Migrator(pool);

// Automatically add missing tables and columns
await migrator.autoSync({ logging: true });
```

Check out the [getting started](/getting-started) guide for more details on setting up your project.
