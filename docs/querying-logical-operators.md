---
weight: 110
group: true
---

# Logical Operators

| Name   | Description                                                                                    |
| ------ | ---------------------------------------------------------------------------------------------- |
| `$and` | joins query clauses with a logical `AND`, returns records that match all the clauses.          |
| `$or`  | joins query clauses with a logical `OR`, returns records that match any of the clauses.        |
| `$not` | joins query clauses with a logical `AND`, returns records that do not match all the clauses.   |
| `$nor` | joins query clauses with a logical `OR`, returns records that do not match any of the clauses. |

---

Example usage for the `$or` logical operator:

```ts
await querier.findMany(User, {
  $project: { id: true },
  $filter: { $or: [{ name: 'abc' }, { creatorId: 1 }] },
});
```

That &#9650; code will generate this &#9660;  `SQL`:

```sql
SELECT `id` FROM `User` WHERE `name` = 'abc' OR `creatorId` = 1
```

---

Example usage for the `$nor` logical operator

```ts
await querier.findMany(User, {
  $project: { id: true },
  $filter: { $nor: [{ name: 'abc' }, { creatorId: 1 }] },
});
```

That &#9650; code will generate this &#9660;  `SQL`:

```sql
SELECT `id` FROM `User` WHERE NOT (`name` = 'abc' OR `creatorId` = 1)
```
