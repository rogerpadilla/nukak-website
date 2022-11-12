---
weight: 190
group: true
---

# Imperative Transactions

Both, _declarative_ and _imperative_ transactions are supported, with the former you can just describe the scope of your transactions, with the later you have more flexibility (hence more responsibility).

To use Imperative Transactions:

1. get the `querier` instance with `await getQuerier()`.
2. run the transaction with `await querier.transaction(callback)`.
3. perform the different operations using the same `querier` (or `repositories`) inside your `callback` function.

```ts
import { getQuerier } from 'nukak';

async function confirm(confirmation: Confirmation): Promise<void> {
  const querier = await getQuerier();
  await querier.transaction(async () => {
    if (confirmation.action === 'signup') {
      await querier.insertOne(User, {
        name: confirmation.name,
        email: confirmation.email,
        password: confirmation.password,
      });
    } else {
      await querier.updateOneById(User, confirmation.creatorId, {
        password: confirmation.password,
      });
    }
    await querier.updateOneById(Confirmation, confirmation.id, { status: 1 });
  });
}
```

---

That &#9650; can also be implemented as this &#9660; (for more granular control):

```ts
async function confirm(confirmation: Confirmation): Promise<void> {
  const querier = await getQuerier();
  try {
    await querier.beginTransaction();
    if (confirmation.action === 'signup') {
      await querier.insertOne(User, {
        name: confirmation.name,
        email: confirmation.email,
        password: confirmation.password,
      });
    } else {
      await querier.updateOneById(User, confirmation.creatorId, {
        password: confirmation.password,
      });
    }
    await querier.updateOneById(Confirmation, confirmation.id, { status: 1 });
    await querier.commitTransaction();
  } catch (error) {
    await querier.rollbackTransaction();
    throw error;
  } finally {
    await querier.release();
  }
}
```

```

```
