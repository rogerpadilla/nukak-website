---
weight: 60
description: This tutorial explain how to define basic entities with the nukak orm.
---

## Basic entities

The following are the steps to define a basic `entity`:

1. Take any class and annotate it with the `@Entity` decorator.
2. Annotate one of its properties with the `@Id` decorator.
3. Annotate the rest of fields with the `@Field` decorator.

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
