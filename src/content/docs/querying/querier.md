---
title: Querier
sidebar:
  order: 180
description: This tutorial explain how to use a querier with the UQL orm.
---

## Querier

A `querier` is the `@uql/core`'s abstraction over database drivers to dynamically generate the queries for _any_ given entity. It allows interaction with the different databases in a consistent way.

With a `querier` you can:

- Manipulate the data related to _any_ `entity`.
- Use [declarative transactions](/transactions-declarative) and [imperative transactions](/transactions-imperative).

```ts
import { User } from './shared/models/index.js';

// Deeply type-safe queries!
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
```

:::note
In the examples above and throughout these docs, `querier` is assumed to be an active instance obtained from your [pool](/getting-started#3-set-up-a-pool).
:::

