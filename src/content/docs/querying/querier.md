---
title: Querier
sidebar:
  order: 180
description: This tutorial explain how to use a querier with the UQL orm.
---

## Querier

A `querier` is UQL's abstraction over database drivers to dynamically generate queries for _any_ given entity. It allows interaction with different databases in a consistent way.

With a `querier` you can:

- Manipulate the data related to _any_ `entity`.
- Use [transactions](/transactions).

### Obtaining a Querier

A querier is obtained from a [pool](/getting-started#2-fast-track-example). Always remember to release it when done:

```ts
import { User } from './entities/index.js';
import { pool } from './uql.config.js';

const querier = await pool.getQuerier();

try {
  const users = await querier.findMany(User, {
    $select: ['id', 'name'],
    $where: { 
      $or: [
        { name: 'roger' }, 
        { creatorId: 1 }
      ] 
    },
    $sort: { createdAt: 'desc' },
    $limit: 10
  });
} finally {
  await querier.release(); // Essential for pool health
}
```

### Available Methods

| Method                                | Description                                   |
| :------------------------------------ | :-------------------------------------------- |
| `findMany(Entity, query)`             | Find multiple records matching the query.     |
| `findOne(Entity, query)`              | Find a single record matching the query.      |
| `findOneById(Entity, id, query?)`     | Find a record by its primary key.             |
| `count(Entity, query)`                | Count records matching the query.             |
| `insertOne(Entity, data)`             | Insert a single record and return its ID.     |
| `insertMany(Entity, data[])`          | Insert multiple records and return their IDs. |
| `updateOneById(Entity, id, data)`     | Update a record by its primary key.           |
| `updateMany(Entity, query, data)`     | Update multiple records matching the query.   |
| `deleteOneById(Entity, id)`           | Delete a record by its primary key.           |
| `deleteMany(Entity, query)`           | Delete multiple records matching the query.   |
| `upsert(Entity, data, conflictPaths)` | Insert or update based on conflict paths.     |
| `run(sql, values?)`                   | Execute raw SQL.                              |
| `transaction(callback)`               | Run a transaction within a callback.          |
| `release()`                           | Return the connection to the pool.            |

### Transactions

For multi-step operations, you can use the pool's `transaction` method which automatically handles the entire querier lifecycle:

```ts
const result = await pool.transaction(async (querier) => {
  const user = await querier.findOne(User, { $where: { email: '...' } });
  await querier.insertOne(Profile, { userId: user.id, bio: '...' });
  return user;
});
// Querier is automatically released
```

If you already have a `querier` instance, you can use its `transaction` method to achieve the same automatic commit/rollback behavior:

```ts
const result = await querier.transaction(async () => {
  await querier.insertOne(Profile, { userId: user.id, bio: '...' });
});
```

See [transactions](/transactions) for more patterns.
