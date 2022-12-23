---
weight: 80
description: This tutorial explain how to use soft-delete in the entities with the nukak orm.
---

## Soft-Delete for entities

The `softDelete` property of the `@Entity` decorator can be used as below.

Note that it is also required to use the `onDelete` property in one of the fields to instruct `nukak` which field to use as the deletion mark when deleting the records.

```ts
/**
 * `softDelete: true` will make the entity "soft deletable".
 */
@Entity({ softDelete: true })
export class MeasureUnitCategory {
  @Id()
  id?: number;

  @Field()
  name?: string;
  
  /**
   * `onDelete` callback allows to specify which field will be used
   * when deleting/querying this entity.
   */
  @Field({ onDelete: Date.now })
  deletedAt?: number;
}
```

&nbsp;

If we delete a record for that entity, it will be soft-deleted, and won't be load by the `find` operations:

```ts
await querier.deleteOneById(MeasureUnitCategory, 1);
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
UPDATE `MeasureUnitCategory` SET `deletedAt` = 1627344820381 WHERE `id` 1
```

&nbsp;

And if we perform any `find` operation for that entity, the soft-deleted records won't be loaded (by default):

```ts
await querier.findMany(MeasureUnitCategory, { $project: ['id', 'name'], $limit: 100 });
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT `id`, `name` FROM `MeasureUnitCategory` WHERE `deletedAt` IS NULL LIMIT 100
```