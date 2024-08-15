---
weight: 180
description: This tutorial explain how to use a querier with the nukak orm.
---

## Querier

A `querier` is the `nukak`'s abstraction over database drivers to dynamically generate the queries for _any_ given entity. It allows interaction with the different databases in a consistent way.

With a `querier` you can:

- Manipulate the data related to _any_ `entity`.
- Use [declarative](/docs/transactions-declarative) and [imperative](/docs/transactions-imperative) transactions.
- Obtain [repositories](/docs/querying-repository) for _specific_ `entities`.

```ts
import { getQuerier } from 'nukak';
import { User } from './shared/models/index.js';

const querier = await getQuerier();

const users = await querier.findMany(
  User,
  {
    $select: ['id'],
    $where: { $or: [{ name: 'maku' }, { creatorId: 1 }] },
  }
);
```

