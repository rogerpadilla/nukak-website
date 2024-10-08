---
weight: 90
description: This tutorial explain how to use virtual-fields in the entities with the nukak orm.
---

## Virtual-Fields for entities

The `virtual` property of the `@Field` decorator can be used as below:

```ts
import { Entity, Id, Field, ManyToMany } from 'nukak/entity';
import { raw } from 'nukak/util';

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
     * `virtual` property allows defining the value for a non-persistent field,
     * such value might be a scalar or a (`raw`) function. Virtual-fields can
     * be used in `$select`, and `$where` as a common field whose value is
     * replaced at runtime.
     */
    virtual: raw(({ escapedPrefix, dialect }) => {
      const query = dialect.count(
        ItemTag,
        {
          $where: {
            itemId: raw(`${escapedPrefix}${dialect.escapeId('id')}`),
          },
        },
        { autoPrefix: true }
      );
      return `(${query})`;
    }),
  })
  tagsCount?: number;
}

@Entity()
export class Tag {
  @Field()
  name?: string;

  @ManyToMany({ entity: () => Item, mappedBy: (item) => item.tags })
  items?: Item[];

  @Field({
    virtual: raw(({ escapedPrefix, dialect }) => {
      /**
       * `virtual` property allows defining the value for a non-persistent field,
       * such value might be a scalar or a (`raw`) function. Virtual-fields can
       * be used in `$select`, and `$where` as a common field whose value is
       * replaced at runtime.
       */
      const query = dialect.count(
        ItemTag,
        {
          $where: {
            tagId: raw(`${escapedPrefix}${dialect.escapeId('id')}`),
          },
        },
        { autoPrefix: true }
      );
      return `(${query})`;
    }),
  })
  itemsCount?: number;
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

If we select the `tagsCount` virtual-column:

```ts
await querier.findMany(Item, { $select: ['id', 'tagsCount'] });
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT
  `id`,
  (SELECT COUNT(*) FROM `ItemTag` WHERE `ItemTag`.`itemId` = `id`) `tagsCount`
FROM `Item`
```

&nbsp;

If we `$where` by the `tagsCount` virtual-column:

```ts
await querier.findMany(
  Item,
  {
    $select: ['id'],
    $where: {
      tagsCount: { $gte: 10 },
    },
  }
);
```

That &#9650; code will generate this &#9660; `SQL`:

```sql
SELECT `id` FROM `Item`
WHERE
  (SELECT COUNT(*) `count` FROM `ItemTag` WHERE `ItemTag`.`itemId` = `id`) >= 10
```
