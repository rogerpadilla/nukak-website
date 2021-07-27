---
weight: 10
---

# Getting Started

`uql` is a flexible and efficient `ORM`, with declarative `JSON` syntax and smart type-safety.

Given it is just a small library with serializable `JSON` syntax, the queries can be written in the client (web/mobile) and send to the backend, or just use `uql` directly in the backend, or even use it in a mobile app with an embedded database.

![autocomplete demo](/code.gif)

## Features

- `JSON` (serializable) syntax for all the queries.
- uses the power of `TypeScript` to get (smart) type-safety everywhere.
- the generated queries are efficient, safe, and human-readable.
- `$project`, `$filter`, `$sort`, `$limit` works at multiple levels (including deep relations and their fields).
- declarative and programmatic `transactions`.
- `soft-delete`, `virtual fields`, `repositories`, `connection pooling`.
- different kinds of `relations` between entities.
- transparent support for `inheritance` patterns between entities.
- supports `Postgres`, `MySQL`, `MariaDB`, `SQLite`, `MongoDB` (beta).
- plugins for frameworks: `express` (more coming).
