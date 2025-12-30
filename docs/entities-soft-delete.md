---
weight: 80
description: This tutorial explain how to use soft-delete in the entities with the UQL orm.
---

## Soft-Delete for entities

Soft-delete allows you to mark records as "deleted" instead of physically removing them from the database. This is useful for auditing, data recovery, and maintaining relational integrity.

### Configuring Soft-Delete

To enable soft-delete, set `softDelete: true` in the `@Entity` decorator and specify which field should be used as the deletion mark with `onDelete`.

```ts
import { Entity, Id, Field } from '@uql/core';

@Entity({ softDelete: true })
export class MeasureUnitCategory {
  @Id()
  id?: number;

  @Field()
  name?: string;

  /**
   * The 'onDelete' callback instructs UQL what value to set when deleting.
   * Common values are a boolean true or a timestamp.
   */
  @Field({ onDelete: () => new Date() })
  deletedAt?: Date;
}
```

&nbsp;

### How it works

When soft-delete is enabled, UQL automatically transforms `delete` operations into `update` operations and adds filters to `find` operations.

#### Deleting a record
```ts
await querier.deleteOneById(MeasureUnitCategory, 1);
```

**Resulting SQL:**
```sql
UPDATE "MeasureUnitCategory" SET "deletedAt" = '2025-12-30T12:00:00Z' WHERE "id" = 1
```

#### Querying records
By default, soft-deleted records are excluded from all queries.

```ts
await querier.findMany(MeasureUnitCategory, { $select: { id: true, name: true } });
```

**Resulting SQL:**
```sql
SELECT "id", "name" FROM "MeasureUnitCategory" WHERE "deletedAt" IS NULL
```

### Advanced: Including Soft-Deleted Records

If you need to include soft-deleted records in a specific query (e.g., for an admin panel or trash view), you can bypass the filter in the query options.

```ts
// Note: UQL provides options to include deleted records at the querier level if needed.
const allCategories = await querier.findMany(MeasureUnitCategory, {
  $where: { /* your filters */ }
}, { includeDeleted: true });
```
*(Check the full API reference for available options on including deleted records)*
