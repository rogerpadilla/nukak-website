---
title: Virtual-Fields for entities
sidebar:
  order: 90
description: This tutorial explain how to use virtual-fields in the entities with the UQL orm.
---

## Virtual-Fields for entities

The `virtual` property of the `@Field` decorator allows you to define non-persistent fields whose values are calculated at runtime using SQL or MongoDB expressions.

UQL's virtual fields use the `QueryContext` pattern, ensuring robust SQL generation and performance.

```ts
import { Entity, Id, Field, ManyToMany } from '@uql/core';
import { raw } from '@uql/core';

@Entity()
export class Item {
  @Id()
  id?: number;

  @Field()
  name?: string;

  @ManyToMany({ entity: () => Tag, through: () => ItemTag, cascade: true })
  tags?: Tag[];

  @Field({
    /**
     * `virtual` property allows defining the value for a non-persistent field.
     * Use the `raw` function to append SQL directly to the QueryContext.
     */
    virtual: raw(({ ctx, dialect, escapedPrefix }) => {
      ctx.append('(');
      dialect.count(ctx, ItemTag, {
        $where: {
          itemId: raw(({ ctx }) => ctx.append(`${escapedPrefix}.id`))
        }
      }, { autoPrefix: true });
      ctx.append(')');
    })
  })
  tagsCount?: number;
}

@Entity()
export class Tag {
  @Id()
  id?: number;

  @Field()
  name?: string;

  @ManyToMany({ entity: () => Item, mappedBy: (item) => item.tags })
  items?: Item[];
}

@Entity()
export class ItemTag {
  @Id()
  id?: number;

  @Field({ reference: () => Item })
  itemId?: number;

  @Field({ reference: () => Tag })
  tagId?: number;
}
```

&nbsp;

### Querying with Virtual Fields

If we select the `tagsCount` virtual-column:

```ts
await querier.findMany(Item, { $select: { id: true, tagsCount: true } });
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT
  "id",
  (SELECT COUNT(*) FROM "ItemTag" WHERE "ItemTag"."itemId" = "id") "tagsCount"
FROM "Item"
```

&nbsp;

If we `$where` by the `tagsCount` virtual-column:

```ts
await querier.findMany(
  Item,
  {
    $select: { id: true },
    $where: {
      tagsCount: { $gte: 10 },
    },
  }
);
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT "id" FROM "Item"
WHERE
  (SELECT COUNT(*) FROM "ItemTag" WHERE "ItemTag"."itemId" = "id") >= 10
```
