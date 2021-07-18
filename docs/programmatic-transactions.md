---
index: 7
group: true
---

# :open_hands: Programmatic Transactions

Both, _declarative_ and _programmatic_ transactions are supported, with the former you can just describe the scope of your transactions, with the later you have more flexibility (hence more responsibility).

To use Programmatic Transactions:

1. get the `querier` instance with `await getQuerier()`.
2. open a `try/catch/finally` block.
3. start the transaction with `await querier.beginTransaction()`.
4. perform the different operations using the `querier` or `repositories`.
5. commit the transaction with `await querier.commitTransaction()`.
6. in the `catch` block, add `await querier.rollbackTransaction()`.
7. release the `querier` back to the pool with `await querier.release()` in the `finally` block.

```ts
import { getQuerier } from '@uql/core';

async function confirmAction(confirmation: Confirmation) {
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
      await querier.updateOneById(User, confirmation.creatorId, { password: confirmation.password });
    }
    await querier.updateOneById(Confirmation, confirmation.id, { status: CONFIRM_STATUS_VERIFIED });
    await querier.commitTransaction();
  } catch (error) {
    await querier.rollbackTransaction();
    throw error;
  } finally {
    await querier.release();
  }
}
```
