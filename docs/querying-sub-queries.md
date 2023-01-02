---
weight: 170
description: This tutorial explain how to use sub-queries with the nukak orm.
---

## Sub-Queries

project a `raw` expression:

```ts
import { raw } from 'nukak/util';

this.querier.findMany(
  Item,
  {
    $group: ['companyId'],
  },
  {
    companyId: true,
    total: raw(({ escapedPrefix, dialect }) => `SUM(${escapedPrefix}${dialect.escapeId('salePrice')})`),
  }
);
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT `companyId`, SUM(`salePrice`) `total` FROM `Item` GROUP BY `companyId`
```

&nbsp;

`$filter` by a `raw` expression:

```ts
import { raw } from 'nukak/util';

await this.querier.findMany(
  Item,
  {
    $filter: { $and: [{ companyId: 1 }, raw('SUM(salePrice) > 500')] },
    $group: ['creatorId'],
  },
  ['id']
);
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT `id` FROM `Item` WHERE `companyId` = 1 AND SUM(salePrice) > 500 GROUP BY `creatorId`
```

&nbsp;

`$nexists` comparison operator:

```ts
import { raw } from 'nukak/util';

await this.querier.findMany(
  Item,
  {
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
  },
  ['id']
);
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT `id`
FROM `Item`
WHERE NOT EXISTS
    (SELECT `User`.`id` FROM `User` WHERE `User`.`companyId` = `Item`.`companyId`)
```
