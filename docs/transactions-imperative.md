---
weight: 190
description: This tutorial explain how to use imperative transactions with the nukak orm.
---

## Imperative transactions

Both, [Declarative](/docs/transactions-declarative) and [Imperative](/docs/transactions-imperative) `transactions` are supported for flexibility, with the former you can just _describe_ the scope of your transactions, with the later you have more flexibility to programmatically specify the lifecycle of a transaction.

**Note**: Pre-requisite step, define a querier pool.

```ts
// in file querierPool.ts
import { setQuerierPool } from 'nukak';
import { PgQuerierPool } from 'nukak-postgres';

export const querierPool = new PgQuerierPool(
  {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  { logger: console.log }
);

setQuerierPool(querierPool);
```

---

### Method 1: shorthand `querierPool.transaction(...)`.

```ts
import { querierPool } from './querierPool.js';

async function confirm(confirmation: Confirmation): Promise<void> {
  await querierPool.transaction(async (querier) => {
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

### Method 2: shorthand `querier.transaction(...)`:

```ts
import { getQuerier } from 'nukak';

async function confirm(confirmation: Confirmation): Promise<void> {
  const querier = await getQuerier();
  await querier.transaction(async () => {
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
  await querier.release()
}
```

---

### Method 3: independent functions for more granular control `querier.*`.

```ts
import { getQuerier } from 'nukak';

async function confirm(confirmation: Confirmation): Promise<void> {
  const querier = await getQuerier();
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
