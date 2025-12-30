---
weight: 190
description: This tutorial explain how to use repositories with the UQL orm.
---

## Repository

A `repository` allows running queries for a _specific_ `entity`, they can be used instead of [queriers](/docs/querying-querier) for this purpose. That way, it is unnecessary to provide the `entity` parameter, and only the `query` parameter is required. Every `repository` is also associated with a single [querier](/docs/querying-querier) instance (from where it was obtained).

With a `repository` you can:

- Manipulate the data related to the linked `entity`.
- Access the [querier](/docs/querying-querier) instance from where the `repository` was obtained.

### Using GenericRepository (Recommended)

```ts
import { GenericRepository } from '@uql/core';
import { User } from './shared/models/index.js';
import { pool } from './shared/orm.js';

const querier = await pool.getQuerier();

try {
  const userRepository = new GenericRepository(User, querier);

  const users = await userRepository.findMany({
    $select: ['id'],
    $where: { $or: [{ name: 'roger' }, { creatorId: 1 }] },
  });
} finally {
  // Always release the querier manually when obtained from the pool
  await querier.release();
}
```

### Obtaining Repository from Querier

```ts
import { User } from './shared/models/index.js';
import { pool } from './shared/orm.js';

const querier = await pool.getQuerier();

try {
  const userRepository = querier.getRepository(User);
  const users = await userRepository.findMany({ /* ... */ });
} finally {
  await querier.release();
}
```
