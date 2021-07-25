---
weight: 190
group: true
---

# Querier

A `querier` can be used to handle different entities.

A `querier` allows to interact with the datasource to perform the following persistence operations:

```ts
export interface Querier {
  /**
   * Counts the number of records matching the given search parameters.
   * @param entity the target entity
   * @param qm the search options
   */
  count<E>(entity: Type<E>, qm?: QuerySearch<E>): Promise<number>;

  /**
   * Obtains the record with the given primary key.
   * @param entity the target entity
   * @param id the primary key value
   * @param qo the criteria options
   */
  findOneById<E>(entity: Type<E>, id: IdValue<E>, qo?: QueryOne<E>): Promise<E>;

  /**
   * Obtains the first record matching the given search parameters.
   * @param entity the target entity
   * @param qm the criteria options
   */
  findOne<E>(entity: Type<E>, qm: QueryOne<E>): Promise<E>;

  /**
   * Obtains the records matching the given search parameters.
   * @param entity the target entity
   * @param qm the criteria options
   */
  findMany<E>(entity: Type<E>, qm: Query<E>): Promise<E[]>;

  /**
   * Obtains the records matching the given search parameters,
   * also counts the number of matches ignoring pagination.
   * @param entity the target entity
   * @param qm the criteria options
   */
  findManyAndCount<E>(entity: Type<E>, qm: Query<E>): Promise<[E[], number]>;

  /**
   * Inserts a record.
   * @param entity the entity to persist on
   * @param payload the data to be persisted
   */
  insertOne<E>(entity: Type<E>, payload: E): Promise<IdValue<E>>;

  /**
   * Inserts many records.
   * @param entity the entity to persist on
   * @param payload the data to be persisted
   */
  insertMany?<E>(entity: Type<E>, payload: E[]): Promise<IdValue<E>[]>;

  /**
   * Updates a record partially.
   * @param entity the entity to persist on
   * @param id the primary key of the record to be updated
   * @param payload the data to be persisted
   */
  updateOneById<E>(entity: Type<E>, id: IdValue<E>, payload: E): Promise<number>;

  /**
   * Updates many records partially.
   * @param entity the entity to persist on
   * @param qm the criteria to look for the records
   * @param payload the data to be persisted
   */
  updateMany?<E>(entity: Type<E>, qm: QueryCriteria<E>, payload: E): Promise<number>;

  /**
   * Insert or update a record.
   * @param entity the entity to persist on
   * @param payload the data to be persisted
   */
  saveOne<E>(entity: Type<E>, payload: E): Promise<IdValue<E>>;

  /**
   * Insert or update records.
   * @param entity the entity to persist on
   * @param payload the data to be persisted
   */
  saveMany?<E>(entity: Type<E>, payload: E[]): Promise<IdValue<E>[]>;

  /**
   * Delete or SoftDelete a record.
   * @param entity the entity to persist on
   * @param id the primary key of the record
   */
  deleteOneById<E>(entity: Type<E>, id: IdValue<E>, opts?: QueryOptions): Promise<number>;

  /**
   * Delete or SoftDelete records.
   * @param entity the entity to persist on
   * @param qm the criteria to look for the records
   */
  deleteMany<E>(entity: Type<E>, qm: QueryCriteria<E>, opts?: QueryOptions): Promise<number>;

  /**
   * Get a repository for the given entity.
   * @param entity the entity to get the repository for
   */
  getRepository<E>(entity: Type<E>): Repository<E>;

  /**
   * Whether this querier is in a transaction or not.
   */
  readonly hasOpenTransaction: boolean;

  /**
   * Starts a new transaction in this querier.
   */
  beginTransaction(): Promise<void>;

  /**
   * Commits the currently active transaction in this querier.
   */
  commitTransaction(): Promise<void>;

  /**
   * Aborts the currently active transaction in this querier.
   */
  rollbackTransaction(): Promise<void>;

  /**
   * Release the querier to the pool.
   */
  release(): Promise<void>;
}
```
