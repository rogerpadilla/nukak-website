---
weight: 190
description: This tutorial explain how to use imperative transactions with the nukak orm.
---

## Imperative transactions

Both, [Declarative](/docs/transactions-declarative) and [Imperative](/docs/transactions-imperative) `transactions` are supported for flexibility, with the former you can just _describe_ the scope of your transactions, with the later you have more flexibility to programmatically specify the lifecycle of a transaction.

Use `Imperative` transactions as below:

1. get the `querier` instance with `await getQuerier()`.
2. run the transaction with `await querier.transaction(callback)`.
3. perform the different operations using the same `querier` (or `repositories`) inside your `callback` function.

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
}
```

&nbsp;

That &#9650; code can also be implemented as this &#9660; (for more granular control):

```ts
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
