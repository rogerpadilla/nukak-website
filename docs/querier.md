---
index: 5
---

# :mag: Querier

Simple query using `getQuerier()`

```ts
import { getQuerier } from '@uql/core';

async function findLatestUserWithProfile() {
  const querier = await getQuerier();
  const user = querier.findOne(User, {
    $project: { id: true, name: true, profile: ['id', 'picture'] },
    $sort: { createdAt: -1 },
  });
  await querier.release();
  return user;
}
```

The above :point_up: code will produce the following `SQL`:

```sql
SELECT `User`.`id`, `User`.`name`, `profile.id`, `profile.picture`
  FROM `User` LEFT JOIN `Profile` `profile` ON `profile`.`creatorId` = `User`.`id`
  ORDER BY `User.createdAt` DESC
```

---

A mandatory join with the relation can also be specified via `$required`

```ts
@Transactional()
async function findLatestUserWithProfile(@InjectQuerier() querier?: Querier) {
    return querier.findOne(User, {
        $project: { id: true, name: true, profile: { $project: ['id', 'picture'], $required: true } },
        $sort: { createdAt: -1 },
    });
}
```

The above :point_up: code will produce the following `SQL`:

```sql
SELECT `User`.`id`, `User`.`name`, `profile.id`, `profile.picture`
  FROM `User` INNER JOIN `Profile` `profile` ON `profile`.`creatorId` = `User`.`id`
  ORDER BY `User.createdAt` DESC
```

---

More complex queries can be used, like the following:

```ts
@Transactional()
async function findItems(@InjectQuerier() querier?: Querier) {
    return querier.findMany(Item, {
        $project: {
            id: true,
            name: true,
            tax: { $project: ['id', 'name'], $filter: 2, $required: true },
            measureUnit: { $project: ['id', 'name'], $filter: { name: { $ne: 'unidad' } }, $required: true },
        },
        $sort: { 'tax.name': 1, 'measureUnit.name': 1 } as QuerySort<Item>,
        $limit: 100,
    });
}
```

The above :point_up: code will produce the following `SQL`:

```sql
SELECT `Item`.`id`, `Item`.`name`, `tax`.`id` `tax.id`, `tax`.`name` `tax.name`,
       `measureUnit`.`id` `measureUnit.id`, `measureUnit`.`name` `measureUnit.name`
    FROM `Item`
        INNER JOIN `Tax` `tax` ON `tax`.`id` = `Item`.`taxId` AND `tax`.`id` = 2
        INNER JOIN `MeasureUnit` `measureUnit` ON `measureUnit`.`id` = `Item`.`measureUnitId`
            AND `measureUnit`.`name` <> 'unidad' AND `measureUnit`.`deletedAt` IS NULL
    ORDER BY `tax`.`name`, `measureUnit`.`name` LIMIT 100
```
