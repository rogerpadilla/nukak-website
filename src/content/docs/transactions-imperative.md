---
title: Imperative transactions
sidebar:
  order: 190
description: This tutorial explain how to use imperative transactions with the UQL orm.
---

## Imperative transactions

Both, [Declarative]/transactions-declarative) and [Imperative]/transactions-imperative) `transactions` are supported for flexibility, with the former you can just _describe_ the scope of your transactions, with the later you have more flexibility to programmatically specify the lifecycle of a transaction.

**Note**: Pre-requisite step, define a querier pool.

```ts
// in file pool.ts
import { setQuerierPool } from '@uql/core';
import { PgQuerierPool } from '@uql/core/postgres';

export const pool = new PgQuerierPool(
  {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  { logger: console.log }
);
```

---


### Independent functions for granular control `querier.*`.

```ts
import { pool } from './shared/orm.js';
import { User, Confirmation } from './shared/models/index.js';

async function confirm(confirmation: Confirmation): Promise<void> {
  const querier = await pool.getQuerier();
  try {
    await querier.beginTransaction();
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
    await querier.commitTransaction();
  } catch (error) {
    await querier.rollbackTransaction();
    throw error;
  } finally {
    await querier.release();
  }
}
```
