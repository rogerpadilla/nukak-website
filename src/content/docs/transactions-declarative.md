---
title: Declarative transactions
sidebar:
  order: 170
description: This tutorial explain how to use declarative transactions with the UQL orm.
---

## Declarative transactions

Both, [Declarative]/transactions-declarative) and [Imperative]/transactions-imperative) `transactions` are supported for flexibility. Declarative transactions allow you to _describe_ the scope of your transactions, while imperative transactions give you direct control over the lifecycle.

### Method 1: `pool.transaction(...)` (Recommended)

This is the simplest way to run a group of operations in a transaction. It handles acquiring a querier from the pool, starting the transaction, committing on success, rolling back on error, and releasing the querier back to the pool.

```ts
import { pool } from './shared/orm.js';
import { User, Confirmation } from './shared/models/index.js';

async function confirm(confirmation: Confirmation): Promise<void> {
  await pool.transaction(async (querier) => {
    if (confirmation.action === 'signup') {
      await querier.insertOne(User, {
        name: confirmation.name,
        email: confirmation.email,
        password: confirmation.password,
      });
    } else {
      await querier.updateOneById(User, confirmation.creatorId, {
        password: confirmation.password,
      });
    }
    await querier.updateOneById(Confirmation, confirmation.id, { status: 1 });
  });
}
```

---

### Method 2: `@Transactional()` Decorator

1. Take any service class, annotate the wanted function with the `@Transactional` decorator.
2. The decorator will automatically handle transaction lifecycle using the global querier pool.
3. You can optionally inject the querier instance from the transaction by decorating one of the function's arguments with `@InjectQuerier`.

```ts
import { Querier } from '@uql/core';
import { Transactional, InjectQuerier } from '@uql/core';
import { User, Confirmation } from './shared/models/index.js';

export class ConfirmationService {
  @Transactional()
  async confirm(confirmation: Confirmation, @InjectQuerier() querier?: Querier): Promise<void> {
    if (confirmation.action === 'signup') {
      await querier.insertOne(User, {
        name: confirmation.name,
        email: confirmation.email,
        password: confirmation.password,
      });
    } else {
      await querier.updateOneById(User, confirmation.creatorId, {
        password: confirmation.password,
      });
    }
    await querier.updateOneById(Confirmation, confirmation.id, { status: 1 });
  }
}

export const confirmationService = new ConfirmationService();

/**
 * All operations within confirm() will automatically run inside a single transaction.
 * The querier is automatically managed.
 */
await confirmationService.confirm(data);
```
