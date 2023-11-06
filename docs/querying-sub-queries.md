---
weight: 170
description: This tutorial explain how to use sub-queries with the nukak orm.
---

## Sub-Queries

`$filter` by a `raw` expression:

```ts
import { raw } from 'nukak/util';

await this.querier.findMany(
  Item,
  {
    $project: ['id'],
    $filter: { $and: [{ companyId: 1 }, raw('SUM(salePrice) > 500')] }
  }
);
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT `id` FROM `Item` WHERE `companyId` = 1 AND SUM(salePrice) > 500
```

&nbsp;

`$nexists` comparison operator:

```ts
import { raw } from 'nukak/util';

await this.querier.findMany(
  Item,
  {
    $project: ['id'],
    $filter: {
      $nexists: raw(({ escapedPrefix, dialect }) =>
        dialect.find(
          User,
          {
            $project: ['id'],
            $filter: { companyId: raw(escapedPrefix + dialect.escapeId(`companyId`)) },
          },
          { autoPrefix: true }
        )
      ),
    },
  }
);
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT `id`
FROM `Item`
WHERE NOT EXISTS
    (SELECT `User`.`id` FROM `User` WHERE `User`.`companyId` = `Item`.`companyId`)
```
