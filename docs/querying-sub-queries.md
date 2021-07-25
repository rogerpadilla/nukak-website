---
weight: 170
group: true
---

# Sub Queries

`$project` a `raw` expression:

```ts
this.querier.findMany(Item, {
  $project: {
    companyId: true,
    total: raw(({ escapedPrefix, dialect }) => `SUM(${escapedPrefix}${dialect.escapeId('salePrice')})`),
  },
  $group: ['companyId'],
});
```

That &#9650; code will generate this &#9660;  `SQL`:

```sql
SELECT `companyId`, SUM(`salePrice`) `total` FROM `Item` GROUP BY `companyId`
```

---

`$filter` by a `raw` expression:

```ts
await this.querier.findMany(Item, {
  $project: ['id'],
  $filter: { $and: [{ companyId: 1 }, raw('SUM(salePrice) > 500')] },
  $group: ['creatorId'],
});
```

That &#9650; code will generate this &#9660;  `SQL`:

```sql
SELECT `id` FROM `Item` WHERE `companyId` = 1 AND SUM(salePrice) > 500 GROUP BY `creatorId`
```

---

`$nexists` comparison operator:

```ts
await this.querier.findMany(Item, {
  $project: {
    id: 1,
  },
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
});
```

That &#9650; code will generate this &#9660;  `SQL`:

```sql
SELECT `id`
FROM `Item`
WHERE NOT EXISTS
    (SELECT `User`.`id` FROM `User` WHERE `User`.`companyId` = `Item`.`companyId`)
```
