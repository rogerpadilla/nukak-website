---
title: Imperative transactions
sidebar:
  order: 190
description: This tutorial explain how to use imperative transactions with the UQL orm.
---

## Imperative Transactions

For scenarios requiring granular control over the transaction lifecycle, UQL provides explicit transaction management methods on the `querier` instance.

**Always ensure queriers are released back to the pool**, even in the event of an error.

```ts
import { pool } from './shared/orm.js';
import { User, Profile } from './shared/models/index.js';

async function registerUser(userData: any, profileData: any) {
  // 1. Obtain a querier from the pool
  const querier = await pool.getQuerier();
  
  try {
    // 2. Start the transaction
    await querier.beginTransaction();

    const userId = await querier.insertOne(User, userData);
    await querier.insertOne(Profile, { ...profileData, userId });

    // 3. Commit the transaction
    await querier.commitTransaction();
  } catch (error) {
    // 4. Rollback on error
    await querier.rollbackTransaction();
    throw error;
  } finally {
    // 5. Always release the querier
    await querier.release();
  }
}
```

### Manual vs Functional Transactions

While imperative transactions provide the most control, the functional [pool.transaction()](/transactions-declarative#method-1-functional-pooltransaction-recommended) approach is recommended for most use cases as it automatically handles the lifecycle (start, commit, rollback, and release) for you.

