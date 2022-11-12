---
weight: 230
---

# Easily call the generated REST APIs from the Client

A client plugin (for browser/mobile) is provided to easily consume the REST APIs from the frontend.

1. Install client plugin in your frontend project:

```sh
npm install nukak-browser --save
```

or with _yarn_

```sh
yarn add nukak-browser
```

2. Use the client to call the `nukak` CRUD API

```ts
import { getRepository } from 'nukak-browser';

// 'User' is an entity class.
const userRepository = getRepository(User);

const users = await userRepository.findMany({
  $project: { email: true, profile: ['picture'] },
  $filter: { email: { $endsWith: '@domain.com' } },
  $sort: { createdAt: -1 },
  $limit: 100,
});
```
