---
weight: 10
---

# Getting Started

`uql` is a flexible `ORM`, with declarative `JSON` syntax to query/update multiple data sources. Just declare what you want from the data source, and then `uql` will run efficient and safe `SQL` (or `Mongo`) queries.

Given it is just a small library with serializable `JSON` syntax, the queries can be written in the client (web/mobile) and send to the backend, or just use `uql` directly in the backend, or even use it in a mobile app with an embedded database.

## Features

- `JSON` (serializable) syntax for all the queries.
- uses the power of `TypeScript` to get (smart) type-safety everywhere.
- generated queries are efficient, safe, and human-readable.
- criteria like `$project`, `$filter`, `$sort`, `$limit` works at multiple levels (including deep relations and their fields).
- declarative and programmatic `transactions`.
- `soft-delete`.
- `virtual fields`.
- `repositories`.
- different kinds of `relations` between entities.
- transparent support for `inheritance` patterns between entities.
- connection pooling.
- supports `Postgres`, `MySQL`, `MariaDB`, `SQLite`, `MongoDB` (beta).
- plugins for frameworks: `express` (more coming).
