---
weight: 180
description: This tutorial explain how to use a querier with the nukak orm.
---

## Querier

A `querier` is the `nukak`'s abstraction over database drivers to dynamically generate the queries. It allows to interact with the different databases in a consistent way.

With a `querier` you can:
- Manipulate the data related to all the `entities`.
- Use [transactions](/docs/transactions-imperative).
- Obtain [repositories](/docs/querying-repository)

```ts
import { getQuerier } from 'nukak';
import { User } from './shared/models/index.js';

const querier = await getQuerier();

const users = await querier.findMany(User, {
  $project: { id: true },
  $filter: { $or: [{ name: 'maku' }, { creatorId: 1 }] },
});

await querier.release();
```

&nbsp;

### Querier API

```ts
/**
 * A `querier` allows to interact with the datasource to perform persistence operations on any entity.
 */
export interface Querier {
  /**
   * counts the number of records matching the given search parameters.
   * @param entity the target entity
   * @param qm the search options
   */
  count<E>(entity: Type<E>, qm?: QuerySearch<E>): Promise<number>;

  /**
   * obtains the record with the given primary key.
   * @param entity the target entity
   * @param id the primary key value
   * @param qm the criteria options
   */
  findOneById<E>(entity: Type<E>, id: IdValue<E>, qm?: QueryUnique<E>): Promise<E>;

  /**
   * obtains the first record matching the given search parameters.
   * @param entity the target entity
   * @param qm the criteria options
   */
  findOne<E>(entity: Type<E>, qm: QueryOne<E>): Promise<E>;

  /**
   * obtains the records matching the given search parameters.
   * @param entity the target entity
   * @param qm the criteria options
   */
  findMany<E>(entity: Type<E>, qm: Query<E>): Promise<E[]>;

  /**
   * obtains the records matching the given search parameters,
   * also counts the number of matches ignoring pagination.
   * @param entity the target entity
   * @param qm the criteria options
   */
  findManyAndCount<E>(entity: Type<E>, qm: Query<E>): Promise<[E[], number]>;

  /**
   * inserts a record.
   * @param entity the entity to persist on
   * @param payload the data to be persisted
   */
  insertOne<E>(entity: Type<E>, payload: E): Promise<IdValue<E>>;

  /**
   * inserts many records.
   * @param entity the entity to persist on
   * @param payload the data to be persisted
   */
  insertMany?<E>(entity: Type<E>, payload: E[]): Promise<IdValue<E>[]>;

  /**
   * updates a record partially.
   * @param entity the entity to persist on
   * @param id the primary key of the record to be updated
   * @param payload the data to be persisted
   */
  updateOneById<E>(entity: Type<E>, id: IdValue<E>, payload: E): Promise<number>;

  /**
   * updates many records partially.
   * @param entity the entity to persist on
   * @param qm the criteria to look for the records
   * @param payload the data to be persisted
   */
  updateMany?<E>(entity: Type<E>, qm: QueryCriteria<E>, payload: E): Promise<number>;

  /**
   * insert or update a record.
   * @param entity the entity to persist on
   * @param payload the data to be persisted
   */
  saveOne<E>(entity: Type<E>, payload: E): Promise<IdValue<E>>;

  /**
   * insert or update records.
   * @param entity the entity to persist on
   * @param payload the data to be persisted
   */
  saveMany?<E>(entity: Type<E>, payload: E[]): Promise<IdValue<E>[]>;

  /**
   * delete or SoftDelete a record.
   * @param entity the entity to persist on
   * @param id the primary key of the record
   */
  deleteOneById<E>(entity: Type<E>, id: IdValue<E>, opts?: QueryOptions): Promise<number>;

  /**
   * delete or SoftDelete records.
   * @param entity the entity to persist on
   * @param qm the criteria to look for the records
   */
  deleteMany<E>(entity: Type<E>, qm: QueryCriteria<E>, opts?: QueryOptions): Promise<number>;

  /**
   * get a repository for the given entity.
   * @param entity the entity to get the repository for
   */
  getRepository<E>(entity: Type<E>): Repository<E>;

  /**
   * whether this querier is in a transaction or not.
   */
  readonly hasOpenTransaction: boolean;

  /**
   * run the given callback inside a transaction in this querier.
   */
  transaction<T>(callback: (querier?: ThisType<Querier>) => Promise<T>): Promise<T>;

  /**
   * starts a new transaction in this querier.
   */
  beginTransaction(): Promise<void>;

  /**
   * commits the currently active transaction in this querier.
   */
  commitTransaction(): Promise<void>;

  /**
   * aborts the currently active transaction in this querier.
   */
  rollbackTransaction(): Promise<void>;

  /**
   * release the querier to the pool.
   */
  release(): Promise<void>;
}
```