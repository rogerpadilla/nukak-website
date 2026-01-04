---
title: Relations between entities

sidebar:
  order: 70
description: This tutorial explain how to use relations in the entities with the UQL orm.
---

## Relations between entities

Relationships are a core part of any ORM. UQL makes it easy to define and query relationships with full type safety and context awareness.

### Defining Relationships

Take any class and annotate it with the decorators from `@uql/core`. You can use `mappedBy` as a string or a callback for better refactoring support.

```ts
import { v7 as uuidv7 } from 'uuid';
import { Entity, Id, Field, OneToOne, OneToMany, ManyToOne, ManyToMany } from '@uql/core';

@Entity()
export class User {
  @Id({ onInsert: () => uuidv7() })
  id?: string;

  @Field()
  name?: string;

  /**
   * One-to-One: A user has one profile.
   * mappedBy can be a string referring to the field in the target entity.
   */
  @OneToOne({ entity: () => Profile, mappedBy: 'userId', cascade: true })
  profile?: Profile;

  /**
   * One-to-Many: A user can have many posts.
   */
  @OneToMany({ entity: () => Post, mappedBy: (post) => post.author })
  posts?: Post[];
}

@Entity()
export class Profile {
  @Id({ onInsert: () => uuidv7() })
  id?: string;

  @Field()
  picture?: string;

  /**
   * Foreign key field. The 'reference' property helps UQL understand 
   * the relationship for schema generation and queries.
   */
  @Field({ reference: () => User })
  userId?: string;

  @OneToOne({ entity: () => User })
  user?: User;
}

@Entity()
export class Post {
  @Id()
  id?: number;

  @Field()
  title?: string;

  @Field({ reference: () => User })
  authorId?: string;

  @ManyToOne({ entity: () => User })
  author?: User;

  /**
   * Many-to-Many: A post can have many tags.
   * 'through' specifies the pivot entity.
   */
  @ManyToMany({ entity: () => Tag, through: () => PostTag, cascade: true })
  tags?: Tag[];
}

@Entity()
export class Tag {
  @Id({ onInsert: () => uuidv7() })
  id?: string;

  @Field()
  name?: string;
}

@Entity()
export class PostTag {
  @Id({ onInsert: () => uuidv7() })
  id?: string;

  @Field({ reference: () => Post })
  postId?: number;

  @Field({ reference: () => Tag })
  tagId?: string;
}
```

&nbsp;

### Querying Relations

When you query relations in UQL, the syntax remains consistent and type-safe. You can select specific fields from related entities or filter based on them.

```ts
// Assuming `querier` is obtained from the pool
const posts = await querier.findMany(Post, {
  $select: {
    id: true,
    title: true,
    author: {
      $select: ['name', 'email']
    },
    tags: {
      $select: ['name'],
      $where: { name: { $startsWith: 'typescript' } }
    }
  },
  $where: {
    author: { name: 'Roger' }
  }
});
```

Check the [querying relations](/querying/relations) section for more advanced examples on deep filtering and selection.
