---
weight: 190
---

If you want to target operations to a specific `entity`, you can use `repositories` instead of [queriers](/docs/querying-querier). That way, you don't need to provide the `entity` parameter, and only the `query` parameter needs to be specified for data manipulation. Each `repository` is associated with a single [querier](/docs/querying-querier).

With a `repository` you can:
- Manipulate the data related to a single `entity`.


```ts
import { getQuerier } from 'nukak';
import { User } from './shared/models/index.js';

const querier = await getQuerier();
const userRepository = querier.getRepository(User);

const users = await userRepository.findMany({
  $project: { id: true },
  $filter: { $or: [{ name: 'abc' }, { creatorId: 1 }] },
});

await querier.release();
```

&nbsp;

### Repository API

A `repository` allows to interact with the datasource to perform persistence operations on a specific entity.

```ts
/**
 * A `repository` allows to interact with the datasource to perform persistence operations on a specific entity.
 */
export interface Repository<E> {
  /**
   * the `entity` type to which this `repository` is linked to.
   */
  readonly entity: Type<E>;

  /**
   * the `querier` instance to which this `repository` is linked to.
   */
  readonly querier: UniversalQuerier;

  /**
   * counts the number of records matching the given search parameters.
   * @param qm the search options
   */
  count(qm: QuerySearch<E>): Promise<number>;

  /**
   * obtains the record with the given primary key.
   * @param id the primary key value
   * @param qm the criteria options
   */
  findOneById(id: IdValue<E>, qm?: QueryUnique<E>): Promise<E>;

  /**
   * obtains the first record matching the given search parameters.
   * @param qm the criteria options
   */
  findOne(qm: QueryOne<E>): Promise<E>;

  /**
   * obtains the records matching the given search parameters.
   * @param qm the criteria options
   */
  findMany(qm: Query<E>): Promise<E[]>;

  /**
   * obtains the records matching the given search parameters,
   * also counts the number of matches ignoring pagination.
   * @param qm the criteria options
   */
  findManyAndCount(qm: Query<E>): Promise<[E[], number]>;

  /**
   * inserts a record.
   * @param payload the data to be persisted
   */
  insertOne(payload: E): Promise<IdValue<E>>;

  /**
   * inserts many records.
   * @param entity the entity to persist on
   * @param payload the data to be persisted
   */
  insertMany?(payload: E[]): Promise<IdValue<E>[]>;

  /**
   * updates a record partially.
   * @param id the primary key of the record to be updated
   * @param payload the data to be persisted
   */
  updateOneById(id: IdValue<E>, payload: E): Promise<number>;

  /**
   * updates many records partially.
   * @param qm the criteria to look for the records
   * @param payload the data to be persisted
   */
  updateMany?(qm: QueryCriteria<E>, payload: E): Promise<number>;

  /**
   * insert or update a record.
   * @param payload the data to be persisted
   */
  saveOne(payload: E): Promise<IdValue<E>>;

  /**
   * insert or update records.
   * @param payload the data to be persisted
   */
  saveMany?(payload: E[]): Promise<IdValue<E>[]>;

  /**
   * delete or SoftDelete a record.
   * @param id the primary key of the record
   */
  deleteOneById(id: IdValue<E>, opts?: QueryOptions): Promise<number>;

  /**
   * delete or SoftDelete records.
   * @param qm the criteria to look for the records
   */
  deleteMany(qm: QueryCriteria<E>, opts?: QueryOptions): Promise<number>;
}
```
