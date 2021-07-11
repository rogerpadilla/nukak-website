---
date: '2'
---
1.  Install the core package:

    ```sh
    npm install @uql/core --save
    ```

    or

    ```sh
    yarn add @uql/core
    ```

2.  Install one of database packages according to your database:

    - for `MySQL` (or `MariaDB`)

      ```sh
      npm install @uql/mysql --save
      ```

      or with _yarn_

      ```sh
      yarn add @uql/mysql
      ```

    - for `PostgreSQL`

      ```sh
      npm install @uql/postgres --save
      ```

      or with _yarn_

      ```sh
      yarn add @uql/postgres
      ```

    - for `SQLite`

      ```sh
      npm install @uql/sqlite --save
      ```

      or with _yarn_

      ```sh
      yarn add @uql/sqlite
      ```

    - for `MongoDB`

      ```sh
      npm install @uql/mongo --save
      ```

      or with _yarn_

      ```sh
      yarn add @uql/mongo
      ```

3.  Your `tsconfig.json` needs the following flags:
    ```json
    "target": "es6", // or a more recent ecmascript version
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
    ```