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
import { Confirmation } from './shared/models';

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
