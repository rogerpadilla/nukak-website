---
sidebar:
  order: 160
title: Naming Strategy Overview
description: This tutorial explain how to use naming strategies with UQL.
---

## Naming Strategies

Naming strategies allow you to automatically translate between your TypeScript code (usually `camelCase`) and your database schema (often `snake_case`). This keeps your database following standard conventions while your code stays idiomatic TypeScript.

### Built-in Strategies

UQL comes with two built-in naming strategies:

| Strategy | Behavior |
| :--- | :--- |
| `DefaultNamingStrategy` | Keeps names exactly as they are in your TypeScript code. |
| `SnakeCaseNamingStrategy` | Automatically converts `camelCase` to `snake_case`. |

### Using a Naming Strategy

Configure the naming strategy when initializing your `QuerierPool`. This affects both runtime queries and [schema generation/migrations](/migrations).

```ts
import { PgQuerierPool } from '@uql/core/postgres';
import { SnakeCaseNamingStrategy } from '@uql/core';

export const pool = new PgQuerierPool(
  { host: 'localhost', database: 'my_db' },
  {
    // CamelCase -> snake_case translation
    namingStrategy: new SnakeCaseNamingStrategy()
  }
);
);
```

:::tip
Ensure this `pool` instance (or configuration) is the one exported in your `uql.config.ts`. This guarantees that the CLI and migrations respect the same Naming Strategy as your runtime application.
:::

### How it works

When using `SnakeCaseNamingStrategy`:
- **Entity**: `UserAccount` → table `user_account`
- **Field**: `createdAt` → column `created_at`
- **Relations**: `authorId` → column `author_id`

### Custom Naming Strategy

You can implement your own naming strategy by extending the `NamingStrategy` interface or inheriting from `DefaultNamingStrategy`.

```ts
import { DefaultNamingStrategy } from '@uql/core';

export class MyCustomNamingStrategy extends DefaultNamingStrategy {
  // Add a prefix to all table names
  override tableName(entityName: string): string {
    return `tbl_${super.tableName(entityName)}`;
  }

  // Force all column names to uppercase
  override columnName(propertyName: string): string {
    return propertyName.toUpperCase();
  }
}
```

