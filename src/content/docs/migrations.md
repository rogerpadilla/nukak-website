---
sidebar:
  order: 150
title: Migrations Overview
description: This tutorial explain how to use database migrations with UQL.
---

## Database Migrations

UQL includes a robust migration system and an "Entity-First" synchronization engine built directly into the core.

### 1. Create Configuration

Create a `uql.config.ts` file in your project root to configure the CLI:

```typescript
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
};
```

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

# Check status of migrations
npx uql-migrate status
```

### 3. Entity-First Synchronization (Development)

In development, you can use `autoSync` to automatically keep your database in sync with your entities without manual migrations. It is **safe by default**, meaning it only adds missing tables and columns.

```ts
import { Migrator } from '@uql/core/migrate';
import { pool } from './shared/orm.js';

// The Migrator will automatically load all classes decorated with @Entity by default.
const migrator = new Migrator(pool);

// Automatically add missing tables and columns
await migrator.autoSync({ logging: true });
```

Check out the [getting started]/getting-started) guide for more details on setting up your project.
