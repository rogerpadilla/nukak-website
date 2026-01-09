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
4. (Optional) Use `@Index` for composite or customized indexes. See [Indexes](/entities/indexes).

```ts
import { v7 as uuidv7 } from 'uuid';
import { Entity, Id, Field, Index } from '@uql/core';

@Entity()
export class User {
  @Id({ type: 'uuid', onInsert: () => uuidv7() })
  id?: string;

  @Field({ index: true })
  name?: string;

  @Field({ unique: true, comment: 'User login email' })
  email?: string;

  @Field({ columnType: 'text', nullable: true })
  bio?: string;
}
```

### Type Abstraction

UQL separates the **intent** of your data from its **storage**:

| Property         | Purpose                                                                | Values                                                                                                           |
| :--------------- | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| **`type`**       | **Logical Type**. Used for runtime behavior and automatic SQL mapping. | `String`, `Number`, `Boolean`, `Date`, `BigInt`, or semantic strings: `'uuid'`, `'json'`, `'jsonb'`, `'vector'`. |
| **`columnType`** | **Physical Type**. Bypasses UQL's inference for exact SQL control.     | Raw SQL types: `'varchar(100)'`, `'decimal(10,2)'`, `'smallint'`, etc.                                           |

```ts
@Field() // Inference: Maps to TEXT (Postgres) or VARCHAR(255) (MySQL) automatically.
name?: string;

@Field({ type: 'uuid' }) // Recommended: Cross-database abstraction for UUIDs.
id?: string;

@Field({ columnType: 'varchar(500)' }) // Control: Explicitly forces a specific SQL type.
bio?: string;
```

### Field Options

The `@Field` and `@Id` decorators accept several options for both query validation and schema generation:

| Option         | Type                | Description                                                                                                                              |
| :------------- | :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `name`         | `string`            | Custom database column name.                                                                                                             |
| `type`         | `Type \| string`    | Logical type for cross-database abstraction: `String`, `Number`, `Boolean`, `Date`, `BigInt`, `'uuid'`, `'json'`, `'jsonb'`, `'vector'`. |
| `columnType`   | `ColumnType`        | Explicit SQL column type (e.g., `varchar`, `text`, `jsonb`, `vector`). Takes highest priority.                                           |
| `length`       | `number`            | Column length. If unspecified, defaults to `TEXT` (Postgres/SQLite) or `VARCHAR(255)` (MySQL/Maria).                                     |
| `nullable`     | `boolean`           | Whether the column allows NULL values. Defaults to `true`.                                                                               |
| `unique`       | `boolean`           | Adds a UNIQUE constraint.                                                                                                                |
| `index`        | `boolean \| string` | Adds an index. Pass a string to name it.                                                                                                 |
| `defaultValue` | `Scalar`            | Default value at the database level.                                                                                                     |
| `comment`      | `string`            | Adds a comment to the column in the database.                                                                                            |
| `onInsert`     | `function`          | Generator function for new records (e.g., for UUIDs).                                                                                    |
| `reference`    | `() => Entity`      | Marks this field as a foreign key referencing another entity's primary key.                                                              |
| `foreignKey`   | `string \| false`   | Custom foreign key constraint name, or `false` to disable physical constraints while maintaining logical references.                     |

### Primary Key Options

The `@Id` decorator also supports:

| Option          | Type      | Description                                                                                                |
| :-------------- | :-------- | :--------------------------------------------------------------------------------------------------------- |
| `autoIncrement` | `boolean` | Explicitly enable/disable auto-increment. Defaults to `true` for numeric types, `false` for strings/UUIDs. |

:::tip
For UUID primary keys, use `@Id({ type: 'uuid', onInsert: () => uuidv7() })` to ensure cross-database compatibility and automatic UUID generation.
:::

---

Continue reading about [Indexes](/entities/indexes) or [Relationships](/entities/relations).
