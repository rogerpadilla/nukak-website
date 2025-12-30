---
sidebar:
  order: 160
title: Naming Strategy Overview
description: This tutorial explain how to use naming strategies with UQL.
---

## Naming Strategies

Naming strategies allow you to automatically translate between your TypeScript code (usually `camelCase`) and your database schema (often `snake_case`).

### Built-in Strategies

UQL comes with two built-in naming strategies:

- `DefaultNamingStrategy`: Keeps names exactly as they are in your TypeScript code.
- `SnakeCaseNamingStrategy`: Automatically converts `camelCase` to `snake_case`.

### Using a Naming Strategy

You can set the naming strategy when initializing your `QuerierPool`.

```ts
import { PgQuerierPool } from '@uql/core/postgres';
import { SnakeCaseNamingStrategy } from '@uql/core';

export const pool = new PgQuerierPool(
  {
    host: 'localhost',
    database: 'my_db',
    // ... other options
  },
  {
    // Automatically translate between TypeScript camelCase and database snake_case.
    // This affects both queries and schema generation.
    namingStrategy: new SnakeCaseNamingStrategy()
  },
);
```

### Custom Naming Strategy

You can also implement your own naming strategy by extending the `NamingStrategy` interface (or inheriting from `DefaultNamingStrategy`).

```ts
import { DefaultNamingStrategy } from '@uql/core';

export class MyCustomNamingStrategy extends DefaultNamingStrategy {
  override tableName(entityName: string): string {
    return `tbl_${super.tableName(entityName)}`;
  }

  override columnName(propertyName: string): string {
    return propertyName.toUpperCase();
  }
}
```

### How it works

When using `SnakeCaseNamingStrategy`:
- Entity `UserAccount` becomes table `user_account`.
- Property `createdAt` becomes column `created_at`.
- Relationship fields are also translated accordingly.

This ensures your database follows standard naming conventions while your code stays idiomatic TypeScript.
