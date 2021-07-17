---
index: 3
---

# :egg: Entity - Basic

Take any dump class (aka DTO) and annotate it with the decorators from `'@uql/core/entity'`.

```ts
import { Field, ManyToOne, Id, OneToMany, Entity, OneToOne, ManyToMany } from '@uql/core/entity';

@Entity()
export class Profile {
  /**
   * primary key
   */
  @Id()
  id?: number;
  @Field()
  picture?: string;
  /**
   * foreign-keys are really simple to specify
   */
  @Field({ reference: () => User })
  creatorId?: number;
}

@Entity()
export class User {
  @Id()
  id?: number;
  @Field()
  name?: string;
  @Field()
  email?: string;
  @Field()
  password?: string;
  /**
   * `mappedBy` can be a callback or a string (callback is useful for auto-refactoring)
   */
  @OneToOne({ entity: () => Profile, mappedBy: (profile) => profile.creatorId, cascade: true })
  profile?: Profile;
}

@Entity()
export class MeasureUnitCategory {
  @Id()
  id?: number;
  @Field()
  name?: string;
  @OneToMany({ entity: () => MeasureUnit, mappedBy: (measureUnit) => measureUnit.category })
  measureUnits?: MeasureUnit[];
}

@Entity()
export class MeasureUnit {
  @Id()
  id?: number;
  @Field()
  name?: string;
  @Field({ reference: () => MeasureUnitCategory })
  categoryId?: number;
  @ManyToOne({ cascade: 'persist' })
  category?: MeasureUnitCategory;
}

@Entity()
export class Item {
  @Id()
  id?: number;
  @Field()
  name?: string;
  @Field()
  description?: string;
  @Field()
  code?: string;
  @ManyToMany({ entity: () => Tag, through: () => ItemTag, cascade: true })
  tags?: Tag[];
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
