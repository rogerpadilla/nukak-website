---
title: Declarative transactions
sidebar:
  order: 170
description: This tutorial explain how to use declarative transactions with the UQL orm.
---

## Declarative Transactions

UQL ensures your operations are serialized and thread-safe. You can use declarative transactions either through the functional `pool.transaction()` approach or via the `@Transactional()` decorator.

### Method 1: Functional `pool.transaction()` (Recommended)

This is the simplest way to run a group of operations in a transaction. It handles acquiring a querier from the pool, starting the transaction, committing on success, rolling back on error, and releasing the querier back to the pool.

```ts
import { pool } from './uql.config.js';
import { User, Profile } from './shared/models/index.js';

const result = await pool.transaction(async (querier) => {
  const user = await querier.findOne(User, { $where: { email: '...' } });
  const profileId = await querier.insertOne(Profile, { userId: user.id, bio: '...' });
  return { userId: user.id, profileId };
});
// The querier is automatically released after the transaction.
```

### Method 2: `@Transactional()` Decorator

Perfect for **NestJS** and other Dependency Injection frameworks. Use `@Transactional()` to wrap a method and `@InjectQuerier()` to access the managed connection.

```ts
import { Transactional, InjectQuerier, type Querier } from '@uql/core';
import { User, Profile } from './shared/models/index.js';

export class UserService {
  @Transactional()
  async register(userData: Partial<User>, profileData: Partial<Profile>, @InjectQuerier() querier?: Querier) {
    const userId = await querier.insertOne(User, userData);
    await querier.insertOne(Profile, { ...profileData, userId });
  }
}
```

:::note
The `@Transactional()` decorator requires `experimentalDecorators` and `emitDecoratorMetadata` to be enabled in your `tsconfig.json`.
:::

