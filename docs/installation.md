---
weight: 30
---

# Installation

1.  Install the core package:

    ```sh
    npm install @uql/core --save
    ```

    or

    ```sh
    yarn add @uql/core
    ```

2.  Install *one of* the following packages according to your database:

| Database     | Package         |
| ------------ | --------------- |
| `MySQL`      | `@uql/mysql`    |
| `PostgreSQL` | `@uql/postgres` |
| `MariaDB`    | `@uql/maria`    |
| `MongoDB`    | `@uql/mongo`    |
| `SQLite`     | `@uql/sqlite`   |

E.g. for `PostgreSQL`

```sh
npm install @uql/postgres --save
```

or with _yarn_

```sh
yarn add @uql/postgres
```

3.  Additionally, your `tsconfig.json` needs the following flags:

```json
"target": "es6", // or a more recent ecmascript version.
"experimentalDecorators": true,
"emitDecoratorMetadata": true
```
