---
date: '3'
---
`uql` initialization should be done once (e.g. in one of the bootstrap files of your app).

```ts
import { setOptions } from '@uql/core';
import { PgQuerierPool } from '@uql/postgres';

setOptions({
  querierPool: new PgQuerierPool({
    host: 'localhost',
    user: 'theUser',
    password: 'thePassword',
    database: 'theDatabase',
  }),
  logging: true,
  logger: console.log,
});
```