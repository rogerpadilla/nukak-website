---
weight: 110
description: This tutorial explain how to use logical operators with the nukak orm.
---

## Logical Operators

| Name   | Description                                                                                    |
| ------ | ---------------------------------------------------------------------------------------------- |
| `$and` | joins query clauses with a logical `AND`, returns records that match all the clauses.          |
| `$or`  | joins query clauses with a logical `OR`, returns records that match any of the clauses.        |
| `$not` | joins query clauses with a logical `AND`, returns records that do not match all the clauses.   |
| `$nor` | joins query clauses with a logical `OR`, returns records that do not match any of the clauses. |

&nbsp;

Example usage for the `$and` logical operator (default operator if unspecified):

```ts
await querier.findMany(User, {
  $project: { id: true },
  $filter: { name: 'maku', creatorId: 1 },
});
```
or the same query with an explicit `$and`

```ts
await querier.findMany(User, {
  $project: { id: true },
  $filter: { $and: [{ name: 'maku' }, { creatorId: 1 }] },
});
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT `id` FROM `User` WHERE `name` = 'maku' AND `creatorId` = 1
```

&nbsp;

Example usage for the `$or` logical operator:

```ts
await querier.findMany(User, {
  $project: { id: true },
  $filter: { $or: [{ name: 'maku' }, { creatorId: 1 }] },
});
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT `id` FROM `User` WHERE `name` = 'maku' OR `creatorId` = 1
```

&nbsp;

Example usage for the `$not` logical operator

```ts
await querier.findMany(User, {
  $project: { id: true },
  $filter: { $not: [{ name: 'maku' }, { creatorId: 1 }] },
});
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT `id` FROM `User` WHERE NOT (`name` = 'maku' AND `creatorId` = 1)
```

&nbsp;

Example usage for the `$nor` logical operator

```ts
await querier.findMany(User, {
  $project: { id: true },
  $filter: { $nor: [{ name: 'maku' }, { creatorId: 1 }] },
});
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT `id` FROM `User` WHERE NOT (`name` = 'maku' OR `creatorId` = 1)
```
