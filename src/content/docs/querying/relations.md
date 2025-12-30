---
title: Querying relations

sidebar:
  order: 150
description: This tutorial explain how to use relations in the queries with the UQL orm.
---

## Querying relations

UQL's query syntax is context-aware. When you query a relation, the available fields and operators are automatically suggested and validated based on that related entity.

### Basic Selection

You can select specific fields from a related entity using an array or a nested object.

```ts
import { pool } from './shared/orm.js';
import { User } from './shared/models/index.js';

const users = await pool.transaction(async (querier) => {
  return querier.findMany(User, {
    $select: {
      id: true,
      name: true,
      profile: ['picture'] // Select specific fields from a 1-1 relation
    },
    $where: {
      email: { $iincludes: '@example.com' }
    }
  });
});
```

### Advanced: Deep Selection & Mandatory Relations

Use `$required: true` to enforce an `INNER JOIN` (by default UQL uses `LEFT JOIN` for nullable relations).

```ts
import { pool } from './shared/orm.js';
import { User } from './shared/models/index.js';

const latestUsersWithProfiles = await pool.transaction(async (querier) => {
  return querier.findOne(User, {
    $select: {
      id: true,
      name: true,
      profile: {
        $select: ['picture', 'bio'],
        $where: { bio: { $ne: null } },
        $required: true // Enforce INNER JOIN
      }
    },
    $sort: { createdAt: -1 },
  });
});
```

### Filtering on Related Collections

You can filter and sort when querying collections (One-to-Many or Many-to-Many).

```ts
import { pool } from './shared/orm.js';
import { User } from './shared/models/index.js';

const authorsWithPopularPosts = await pool.transaction(async (querier) => {
  return querier.findMany(User, {
    $select: {
      id: true,
      name: true,
      posts: {
        $select: ['title', 'createdAt'],
        $where: { title: { $iincludes: 'typescript' } },
        $sort: { createdAt: -1 },
        $limit: 5
      }
    },
    $where: {
      name: { $istartsWith: 'a' }
    }
  });
});
```

### Sorting by Related Fields

UQL allows sorting by fields of related entities directly in the `$sort` object.

```ts
const items = await querier.findMany(Item, {
  $select: { id: true, name: true },
  $sort: { 
    tax: { name: 1 }, 
    measureUnit: { name: 1 }, 
    createdAt: -1 
  }
});
```
