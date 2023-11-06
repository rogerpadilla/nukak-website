---
weight: 130
description: This tutorial explain how to use comparison operators with the nukak orm.
---

## Comparison Operators

| Name           | Description                                                                        |
| -------------- | ---------------------------------------------------------------------------------- |
| `$eq`          | whether a value is equal to the given value.                                       |
| `$ne`          | whether a value is not equal to the given value.                                   |
| `$not`         | negates the given comparison.                                                      |
| `$lt`          | whether a value is less than the given value.                                      |
| `$lte`         | whether a value is less than or equal to the given value.                          |
| `$gt`          | whether a value is greater than the given value.                                   |
| `$gte`         | whether a value is greater than or equal to the given value.                       |
| `$startsWith`  | whether a string begins with the given string (case sensitive).                    |
| `$istartsWith` | whether a string begins with the given string (case insensitive).                  |
| `$endsWith`    | whether a string ends with the given string (case sensitive).                      |
| `$iendsWith`   | whether a string ends with the given string (case insensitive).                    |
| `$includes`    | whether a string is contained within the given string (case sensitive).            |
| `$iincludes`   | whether a string is contained within the given string (case insensitive).          |
| `$like`        | whether a string fulfills the given pattern (case sensitive).                      |
| `$ilike`       | whether a string fulfills the given pattern (case insensitive).                    |
| `$regex`       | whether a string matches the given regular expression.                             |
| `$in`          | whether a value matches any of the given values.                                   |
| `$nin`         | whether a value does not match any of the given values.                            |
| `$text`        | whether the specified fields match against a full-text search of the given string. |
| `$exists`      | whether the record exists in the given sub-query.                                  |
| `$nexists`     | whether the record does not exists in the given sub-query.                         |

&nbsp;

Example usage for the `$istartsWith` and `$ne` comparison operators:

```ts
await this.querier.findMany(
  User,
  {
    $project: ['id'],
    $filter: { name: { $istartsWith: 'Some', $ne: 'Something' } },
    $sort: { name: 1, id: -1 },
    $limit: 50,
  }
);
```

That &#9650; code will generate this &#9660; `SQL` for `Postgres`:

```sql
SELECT  "id" FROM "User"
WHERE ("name" ILIKE 'Some%' AND "name" <> 'Something')
ORDER BY "name", "id" DESC
LIMIT 50
```

And that same code above will generate this other &#9660; `SQL` for `MySQL`, `MariaDB` and `SQLite`:

```sql
SELECT  `id` FROM `User`
WHERE (LOWER(`name`) LIKE 'some%' AND `name` <> 'Something')
ORDER BY `name`, `id` DESC
LIMIT 50
```
