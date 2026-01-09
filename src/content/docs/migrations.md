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

| Command | Description |
| :--- | :--- |
| `generate <name>` | Creates an empty timestamped file for **manual** SQL migrations (e.g., data backfills). |
| `generate:entities <name>` | **Auto-generates** a migration by diffing your entities against the current DB schema. |
| `generate:from-db` | **Scaffolds Entities** from an existing database. Includes **Smart Relation Detection**. |
| `drift:check` | **Drift Detection**: Compares your defined entities against the actual database schema and reports discrepancies. |
| `up` | Applies all pending migrations. |
| `down` | Rolls back the last applied migration batch. |
| `status` | Shows which migrations have been executed and which are pending. |

```bash
# Create a manual migration
npx uql-migrate generate add_users_table

# Generate a migration by comparing entities vs database
npx uql-migrate generate:entities initial_schema

# Run all pending migrations
npx uql-migrate up

# Rollback the last migration
npx uql-migrate down

# Check for schema drift (Production Safety)
npx uql-migrate drift:check

# Scaffold entities from an existing DB (Legacy Adoption)
npx uql-migrate generate:from-db --output ./src/entities

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

In development, you can use `autoSync` to automatically keep your database in sync with your entities without manual migrations. It uses the new **Schema AST** engine to perform graph-based comparison and is **safe by default**, meaning it only adds missing tables and columns while **blocking** any destructive operations (column drops or type alterations) to prevent data loss.

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

### Advanced Capabilities

The synchronization engine is built on a powerful **Schema AST (Abstract Syntax Tree)** that treats your database schema as a graph, not just a list of tables.

#### 1. Schema AST Engine
*   **Graph-Based Diffing**: Handles complex circular dependencies and ensures correct topological sort order when creating or dropping tables.
*   **100% Accurate**: Eliminates "phantom diffs" by understanding the semantic differences between dialect-specific types (e.g., `INTEGER` vs `INT`).

#### 2. Smart Relation Detection
When scaffolding entities from an existing database (`generate:from-db`), UQL automatically detects relationships by analyzing your schema:

*   **Explicit Foreign Keys**: Standard foreign keys are mapped to `@OneToMany` / `@ManyToOne`.
*   **One-to-One Relations**: Detected when a foreign key column also has a **unique constraint**.
*   **Many-to-Many Relations**: Automatically identified by detecting **Junction Tables** (tables with exactly two foreign keys and no other business data).
*   **Naming Conventions**: If foreign keys are missing, UQL infers logical relations from column naming patterns like `user_id` -> `User`.

#### 3. Drift Detection
Ensure production safety with `drift:check`. It compares your TypeScript entity definitions against the actual running database and reports:
*   **Critical**: Missing tables or columns, type mismatches that risk data truncation.
*   **Warning**: Missing indexes or unexpected columns.

#### 4. Bidirectional Index Sync
Indexes are synchronized in both directions:
*   **Enity -> DB**: `@Field({ index: true })` creates an index in the database.
*   **DB -> Entity**: Existing database indexes are reflected in generated entity files.

### Other Features
- **64-bit Primary Keys**: Auto-increment primary keys use `BIGINT` across all dialects for TypeScript `number` compatibility.
- **SQLite STRICT Mode**: Tables generated for SQLite, LibSQL, and Cloudflare D1 use **STRICT mode** by default.
- **Safe Primary Keys**: Primary keys are immune to automated alterations during `autoSync`.
- **Foreign Key Inheritance**: Foreign key columns automatically inherit the exact SQL type of their referenced primary keys.

Check out the [getting started](/getting-started) guide for more details on setting up your project.

## Migration Builder API

When writing manual migrations (via `generate`), you have access to a fluent, type-safe API for defining your schema.

### Comprehensive Example

```typescript
import { defineMigration, t } from '@uql/core/migrate';

export default defineMigration({
  async up(m) {
    // 1. Create a table with all supported column types
    await m.createTable('all_types_demo', (table) => {
      // --- Numeric Types ---
      table.id(); // Auto-incrementing primary key (BigInt)
      table.integer('user_age', { nullable: true });
      table.smallint('status_id', { defaultValue: 0 });
      table.bigint('view_count', { defaultValue: 0n });
      table.float('rating'); // Standard float
      table.double('precise_score'); // Double precision
      table.decimal('price', { precision: 10, scale: 2 }); // DECIMAL(10,2)

      // --- String Types ---
      table.string('username', { length: 50, unique: true }); // VARCHAR(50)
      table.string('email'); // VARCHAR(255) by default
      table.char('country_code', { length: 2 }); // CHAR(2)
      table.text('bio'); // TEXT (unlimited length)

      // --- Boolean ---
      table.boolean('is_active', { defaultValue: true });

      // --- Date & Time ---
      table.date('birth_date');
      table.time('daily_alarm');
      table.timestamp('created_at', { defaultValue: t.now() });
      table.timestamptz('updated_at'); // With timezone

      // --- JSON & Advanced ---
      table.json('settings'); // Standard JSON
      table.jsonb('metadata'); // Binary JSON (Postgres)
      table.uuid('external_id', { defaultValue: t.uuid() }); // UUID v4
      table.blob('file_data'); // Binary data
      table.vector('embedding', { dimensions: 1536 }); // Vector for AI

      // --- Relationships & Constraints ---
      table.integer('author_id', {
        references: { 
          table: 'users', 
          column: 'id', // optional (default: id)
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION'
        }
      });
      
      // Composite constraints
      table.unique(['username', 'email']);
      table.index(['is_active', 'created_at']);
      
      // Comments
      table.comment('A comprehensive demo table');
    });

    // 2. Modify an existing table
    await m.alterTable('users', (table) => {
      table.addColumn('nickname', (c) => c.string({ length: 100 }));
      table.dropColumn('legacy_field');
      table.renameColumn('full_name', 'name');
      table.alterColumn('email', (c) => c.string({ length: 300 })); // Expand length
      
      table.addIndex(['nickname']);
      table.addForeignKey(['profile_id'], { 
        table: 'profiles', 
        columns: ['id'] 
      });
    });

    // 3. Raw SQL (Escape hatch)
    await m.raw('CREATE VIEW active_users AS SELECT * FROM users WHERE is_active = true');
  },

  async down(m) {
    await m.raw('DROP VIEW IF EXISTS active_users');
    await m.dropTable('all_types_demo');
    // ... reverse other changes
  }
});
```

### Column Options Reference

All column methods accept an optional settings object:

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `nullable` | `boolean` | `false` | Allow NULL values? (**Default is NOT NULL**) |
| `defaultValue` | `any` | `undefined` | Default value (use `t.now()`, `t.uuid()` for expressions) |
| `unique` | `boolean` | `false` | Add a unique constraint |
| `primaryKey` | `boolean` | `false` | Mark as primary key |
| `autoIncrement` | `boolean` | `false` | Enable auto-increment (integers only) |
| `index` | `boolean` \| `string` | `false` | Create an index (bool=auto-name, string=custom-name) |
| `comment` | `string` | - | Database comment for the column |
| `references` | `object` | - | Define Foreign Key (see example above) |
