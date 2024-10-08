---
weight: 400
description: This tutorial explain how to use the browser plugin with the nukak orm.
---

## Browser plugin

### Use the generated REST API similarly as if you were on the backend

The `nukak-browser` package allows to easily consume `nukak` REST APIs from the frontend.

1. Install `nukak-browser` in your frontend project:

```sh
npm install nukak-browser --save
```

or with _yarn_

```sh
yarn add nukak-browser
```

2. Use `nukak-browser` to call a `nukak` REST API

```ts
import { getRepository } from 'nukak-browser';
import { User } from './shared/models/index.js';

// 'User' is an entity class.
const userRepository = getRepository(User);

const users = await userRepository.findMany(
  {
    $select: { email: true, profile: ['picture'] },
    $where: { email: { $endsWith: '@domain.com' } },
    $sort: { createdAt: -1 },
    $limit: 100,
  }
);
```
