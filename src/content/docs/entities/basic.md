---
title: Basic entities
sidebar:
  order: 60
description: This tutorial explain how to define basic entities with the UQL orm.
---
## Basic entities

The following are the steps to define a basic `entity`:

1. Take any class and annotate it with the `@Entity` decorator.
2. Annotate one of its properties with the `@Id` decorator.
3. Annotate the rest of fields with the `@Field` decorator.

```ts
import { v7 as uuidv7 } from 'uuid';
import { Entity, Id, Field } from '@uql/core';

@Entity()
export class User {
  @Id({ onInsert: () => uuidv7() })
  id?: string;

  @Field({ length: 100, index: true })
  name?: string;

  @Field({ unique: true, comment: 'User login email' })
  email?: string;

  @Field({ columnType: 'text', nullable: true })
  bio?: string;
}
```

### Field Options

The `@Field` and `@Id` decorators accept several options for both query validation and schema generation:

| Option           | Type                 | Description                                                                                              |
| :--------------- | :------------------- | :------------------------------------------------------------------------------------------------------- |
| `name`         | `string`           | Custom database column name.                                                                             |
| `columnType`   | `ColumnType`       | Explicit SQL column type (e.g.,`varchar`, `text`, `jsonb`, `vector`).                            |
| `length`       | `number`           | Column length. If unspecified, defaults to `TEXT` (Postgres/SQLite) or `VARCHAR(255)` (MySQL/Maria). |
| `nullable`     | `boolean`          | Whether the column allows NULL values. Defaults to `true`.                                             |
| `unique`       | `boolean`          | Adds a UNIQUE constraint.                                                                                |
| `index`        | `boolean \| string` | Adds an index. Pass a string to name it.                                                                 |
| `defaultValue` | `Scalar`           | Default value at the database level.                                                                     |
| `comment`      | `string`           | Adds a comment to the column in the database.                                                            |
| `onInsert`     | `function`         | Generator function for new records (e.g., for UUIDs).                                                    |
