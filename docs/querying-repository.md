---
weight: 190
description: This tutorial explain how to use repositories with the nukak orm.
---

## Repository

A `repository` allows running queries for a _specific_ `entity`, they can be used instead of [queriers](/docs/querying-querier) for this purpose. That way, it is unnecessary to provide the `entity` parameter, and only the `query` parameter is required. Every `repository` is also associated with a single [querier](/docs/querying-querier) instance (from where it was obtained).

With a `repository` you can:

- Manipulate the data related to the linked `entity`.
- Access the [querier](/docs/querying-querier) instance from where the `repository` was obtained.

```ts
import { getQuerier } from 'nukak';
import { User } from './shared/models/index.js';

const querier = await getQuerier();
const userRepository = querier.getRepository(User);

const users = await userRepository.findMany(
  {
    $select: ['id'],
    $where: { $or: [{ name: 'maku' }, { creatorId: 1 }] },
  }
);

await querier.release();
```
