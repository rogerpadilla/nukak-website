---
weight: 70
group: true
---

# Soft Delete

The `softDelete` property of the `@Entity` decorator can be used as below.

Note: it is also required to use the `onDelete` property in one of the fields to instruct `uql` which field to use as the deletion mark when deleting the records.

```ts
/**
 * `softDelete` will make the entity "soft deletable".
 */
@Entity({ softDelete: true })
export class MeasureUnitCategory {
  @Id()
  id?: number;
  @Field()
  name?: string;
  /**
   * `onDelete` callback allows to specify which field will be used when deleting/querying this entity.
   */
  @Field({ onDelete: Date.now })
  deletedAt?: number;
}
```

Then for example, if we do `querier.deleteOneById(MeasureUnitCategory, 1)`, that record will be soft-deleted (and won't be load by the `find` operations).
