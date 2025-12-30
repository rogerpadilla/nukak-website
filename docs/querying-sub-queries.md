---
weight: 170
description: This tutorial explain how to use sub-queries with the UQL orm.
---

## Sub-Queries

UQL provides a powerful way to write sub-queries using `raw` expressions that interact directly with the `QueryContext`.

### `$where` by a `raw` expression

```ts
import { raw } from '@uql/core/util';
import { pool } from './shared/orm.js';

const querier = await pool.getQuerier();

try {
  const items = await querier.findMany(
    Item,
    {
      $select: { id: true },
      $where: { $and: [{ companyId: 1 }, raw('SUM(salePrice) > 500')] }
    }
  );
} finally {
  await querier.release();
}
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT "id" FROM "Item" WHERE "companyId" = 1 AND SUM(salePrice) > 500
```

&nbsp;

### Sub-queries with `$exists` / `$nexists`

Use the `dialect` methods inside a `raw` callback to generate a sub-query that is correctly prefixed and context-aware.

```ts
import { raw } from '@uql/core/util';
import { pool } from './shared/orm.js';
import { User, Item } from './shared/models/index.js';

const querier = await pool.getQuerier();

try {
  const items = await querier.findMany(
    Item,
    {
      $select: { id: true },
      $where: {
        $nexists: raw(({ ctx, dialect, escapedPrefix }) => {
          dialect.find(
            ctx,
            User,
            {
              $select: { id: true },
              $where: { companyId: raw(({ ctx }) => ctx.append(`${escapedPrefix}.companyId`)) },
            },
            { autoPrefix: true }
          );
        }),
      },
    }
  );
} finally {
  await querier.release();
}
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT "id"
FROM "Item"
WHERE NOT EXISTS
    (SELECT "User"."id" FROM "User" WHERE "User"."companyId" = "Item"."companyId")
```
