---
weight: 180
description: This tutorial explain how to use a querier with the UQL orm.
---

## Querier

A `querier` is the `@uql/core`'s abstraction over database drivers to dynamically generate the queries for _any_ given entity. It allows interaction with the different databases in a consistent way.

With a `querier` you can:

- Manipulate the data related to _any_ `entity`.
- Use [declarative](/docs/transactions-declarative) and [imperative](/docs/transactions-imperative) transactions.
- Obtain [repositories](/docs/querying-repository) for _specific_ `entities`.

```ts
import { User } from './shared/models/index.js';
import { pool } from './shared/orm.js';

// Obtain a querier from the pool
const querier = await pool.getQuerier();

try {
  const users = await querier.findMany(
    User,
    {
      $select: ['id'],
      $where: { $or: [{ name: 'roger' }, { creatorId: 1 }] },
    }
  );
} finally {
  // IMPORTANT: Always release the querier to return the connection to the pool
  await querier.release();
}
```
