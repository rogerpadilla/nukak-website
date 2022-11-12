---
weight: 210
group: true
---

# Autogenerate REST APIs with Express

A `express` plugin is provided to automatically generate REST APIs for your entities.

1. Install express plugin in your server project:

```sh
npm install nukak-express --save
```

or with _yarn_

```sh
yarn add nukak-express
```

1. Initialize the `express` middleware in your server code to generate REST APIs for your entities

```ts
import * as express from 'express';
import { Query, QueryFilter, EntityMeta } from 'nukak/type';
import { querierMiddleware } from 'nukak-express';

const app = express();

app
  // ...
  .use(
    '/api',
    // this will generate REST APIs for the entities.
    querierMiddleware({
      // all entities will be automatically exposed unless
      // 'include' or 'exclude' options are provided.
      exclude: [Confirmation]
    })
  );
```
