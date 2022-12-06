---
weight: 60
---

## Basic entities

To define a basic `entity`, the following are the essential steps:
1. Take any class and annotate it with the `@Entity` decorator.
2. Annotate one of its properties with the `@Id` decorator.
3. Annotate the rest of fields with the `@Field` decorator.

For more advanced topics about `entities`, please see [relations](/docs/entities-relations), [virtual-fields](/docs/entities-virtual-fields), [soft-delete](/docs/entities-soft-delete) and [inheritance](/docs/entities-inheritance)

```ts
import { v4 as uuidv4 } from 'uuid';
import { Entity, Id, Field } from 'nukak/entity';

@Entity()
export class User {
  @Id({ onInsert: uuidv4 })
  id?: string;
  @Field()
  name?: string;
  @Field()
  email?: string;
  @Field()
  password?: string;
}
```
