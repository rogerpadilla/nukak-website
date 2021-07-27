---
weight: 200
group: true
---

# Repository

A `repository` is linked to a specified entity.

A `repository` allows to interact with the datasource to perform the following persistence operations:

```ts
export interface Repository {
  /**
   * Counts the number of records matching the given search parameters.
   * @param qm the search options
   */
  count(qm: QuerySearch<E>): Promise<number>;

  /**
   * Obtains the record with the given primary key.
   * @param id the primary key value
   * @param qo the criteria options
   */
  findOneById(id: IdValue<E>, qo?: QueryOne<E>): Promise<E>;

  /**
   * Obtains the first record matching the given search parameters.
   * @param qm the criteria options
   */
  findOne(qm: QueryOne<E>): Promise<E>;

  /**
   * Obtains the records matching the given search parameters.
   * @param qm the criteria options
   */
  findMany(qm: Query<E>): Promise<E[]>;

  /**
   * Obtains the records matching the given search parameters,
   * also counts the number of matches ignoring pagination.
   * @param qm the criteria options
   */
  findManyAndCount(qm: Query<E>): Promise<[E[], number]>;

  /**
   * Inserts a record.
   * @param payload the data to be persisted
   */
  insertOne(payload: E): Promise<IdValue<E>>;

  /**
   * Inserts many records.
   * @param entity the entity to persist on
   * @param payload the data to be persisted
   */
  insertMany?(payload: E[]): Promise<IdValue<E>[]>;

  /**
   * Updates a record partially.
   * @param id the primary key of the record to be updated
   * @param payload the data to be persisted
   */
  updateOneById(id: IdValue<E>, payload: E): Promise<number>;

  /**
   * Updates many records partially.
   * @param qm the criteria to look for the records
   * @param payload the data to be persisted
   */
  updateMany?(qm: QueryCriteria<E>, payload: E): Promise<number>;

  /**
   * Insert or update a record.
   * @param payload the data to be persisted
   */
  saveOne(payload: E): Promise<IdValue<E>>;

  /**
   * Insert or update records.
   * @param payload the data to be persisted
   */
  saveMany?(payload: E[]): Promise<IdValue<E>[]>;

  /**
   * Delete or SoftDelete a record.
   * @param id the primary key of the record
   */
  deleteOneById(id: IdValue<E>, opts?: QueryOptions): Promise<number>;

  /**
   * Delete or SoftDelete records.
   * @param qm the criteria to look for the records
   */
  deleteMany(qm: QueryCriteria<E>, opts?: QueryOptions): Promise<number>;
}
```
