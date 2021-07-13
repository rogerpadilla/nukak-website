---
date: '1'
---
`uql` is a plug & play `ORM`, with a declarative `JSON` syntax to query/update multiple data-sources. Essentially, just declare what you want from the datasource, and then `uql` will run efficient (and safe) `SQL` (or `Mongo`) queries.

Given `uql` is just a small library with serializable `JSON` syntax, the queries can be written in the client (web/mobile) and send to the backend; or just use `uql` directly in the backend; or even use it in a mobile app with an embedded database.

### :star2: Features

- `JSON` (serializable) syntax for all the queries.
- uses the power of `TypeScript`: smart type inference everywhere so the queries and models are easier to maintain and more reliable.
- generated queries are fast, safe, and human-readable.
- `project`, `filter`, `sort`, and `pager` at multiple levels. Including deep relations and their fields.
- declarative and programmatic `transactions`.
- `soft-delete`.
- `virtual fields`.
- entity `repositories`.
- different kind of `relations` between entities.
- supports `inheritance` patterns between entities.
- connection pooling.
- supports Postgres, MySQL, MariaDB, SQLite, MongoDB (beta).
- plugins for frameworks: express (more coming).