---
weight: 150
title: Migrations Overview
description: This tutorial explain how to use database migrations with UQL.
---

## Database Migrations

UQL includes a robust migration system and an "Entity-First" synchronization engine built directly into the core.

### 1. Create Configuration

Create a `uql.config.ts` file in your project root to configure the CLI:

```typescript
import { PgQuerierPool } from '@uql/core/postgres';
import { User, Post } from './shared/models/index.js';

export default {
  querierPool: new PgQuerierPool({ 
    host: 'localhost',
    user: 'theUser',
    password: 'thePassword',
    database: 'theDatabase'
  }),
  entities: [User, Post],
  migrationsPath: './migrations',
};
```

### 2. Manage via CLI

UQL provides a dedicated CLI tool for migrations.

```bash
# Generate a migration by comparing entities vs database
npx uql-migrate generate initial_schema

# Run pending migrations
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
import { querierPool } from './shared/orm.js';

const migrator = new Migrator(querierPool);

// Automatically add missing tables and columns
await migrator.autoSync({ logging: true });
```

Check out the [getting started](/docs/getting-started) guide for more details on setting up your project.
