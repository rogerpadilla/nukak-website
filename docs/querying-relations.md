---
weight: 150
description: This tutorial explain how to use relations in the queries with the nukak orm.
---

## Querying relations

select a mandatory relation with `$required: true`:

```ts
@Transactional()
async function findLatestUserWithProfile(@InjectQuerier() querier?: Querier): Promise<User> {
  return querier.findOne(User,
    {
      $select: {
        id: true,
        name: true,
        profile: {
          $select: ['id', 'picture'],
          $required: true
        }
      },
      $sort: { createdAt: -1 },
    }
  );
}
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT `User`.`id`, `User`.`name`, `profile.id`, `profile.picture`
FROM `User`
INNER JOIN `Profile` `profile` ON `profile`.`creatorId` = `User`.`id`
ORDER BY `User.createdAt` DESC
```

&nbsp;

Simple query using `getQuerier()`:

```ts
import { getQuerier } from 'nukak';

async function findLatestUserWithProfile(): Promise<User> {
  const querier = await getQuerier();
  const user = querier.findOne(
    User,
    {
      $select: {
        id: true,
        name: true,
        profile: ['id', 'picture'],
      },
      $sort: { createdAt: -1 },
    }    
  );
  return user;
}
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT `User`.`id`, `User`.`name`, `profile.id`, `profile.picture`
FROM `User`
LEFT JOIN `Profile` `profile` ON `profile`.`creatorId` = `User`.`id`
ORDER BY `User.createdAt` DESC
```

&nbsp;

More complex queries can be used, like the following:

```ts
import { Querier } from 'nukak';
import { Transactional, InjectQuerier } from 'nukak/querier';
import { Item } from './shared/models/index.js';

export class ItemService {
  @Transactional()
  async function findItems(@InjectQuerier() querier?: Querier): Promise<Item[]> {
    return querier.findMany(Item,
      {
        $select: {
          id: true,
          name: true,
          measureUnit: {
            $select: ['id', 'name'],
            $where: { name: { $ne: 'unidad' } },
            $required: true
          },
          tax: ['id', 'name'],
        },
        $where: { salePrice: { $gte: 1000 }, name: { $istartsWith: 'A' } },
        $sort: { tax: { name: 1 }, measureUnit: { name: 1 }, createdAt: -1 },
        $limit: 100,
      }      
    );
  }
}

export const itemService = new ItemService();
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT `Item`.`id`, `Item`.`name`,
       `measureUnit`.`id` `measureUnit.id`, `measureUnit`.`name` `measureUnit.name`,
       `tax`.`id` `tax.id`, `tax`.`name` `tax.name`
FROM `Item`
INNER JOIN `MeasureUnit` `measureUnit` ON `measureUnit`.`id` = `Item`.`measureUnitId`
  AND `measureUnit`.`name` <> 'unidad' AND `measureUnit`.`deletedAt` IS NULL
LEFT JOIN `Tax` `tax` ON `tax`.`id` = `Item`.`taxId`
WHERE `Item`.`salePrice` >= 1000 AND LOWER(`Item`.`name`) LIKE 'a%'
ORDER BY `tax`.`name`, `measureUnit`.`name`, `Item`.`createdAt` DESC LIMIT 100
```
