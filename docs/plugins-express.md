---
weight: 330
---

# Autogenerate REST APIs with Express

The `nukak-express` package automatically generates REST APIs for your entities.

1. Install `nukak-express` in your server project:

```sh
npm install nukak-express --save
```

or with _yarn_

```sh
yarn add nukak-express
```

2. Initialize the `querierMiddleware` middleware in your server code to generate REST APIs for your entities

```ts
import * as express from 'express';
import { querierMiddleware } from 'nukak-express';
import { User, Product, Category } from './shared/models/index.js';

const app = express();

app
  // ...
  .use(
    '/api',
    // this will generate REST APIs for the entities.
    querierMiddleware({
      /**
       * allow specify which entities will be used by the middleware
       * (all of them are used by default)
       */
      include: [User, Product, Category],
      /**
       * allow excluding some entities of being used by the middleware
       * (all of them are used by default)
       */
      exclude: [User],
      /**
       * Allow augment any kind of request before it runs
       */
      pre(req, meta) {
        console.log(`${req.method} ${req.url} ${meta.name}`);
        if (req.method === 'POST' && meta.entity === Product) {
          console.log(`A new product is going to be created!`);
        }
      },
      /**
       * Allow augment a saving request (POST, PATCH, PUT) before it runs
       */
      preSave(req) {
        req.body.creatorId = req.identify.userId;
      },
      /**
       * Allow augment a filtering request (GET, DELETE) before it runs
       */
      preFilter(req) {
        req.query.$filter.creatorId = req.identify.userId;
      },
    })
  );
```
