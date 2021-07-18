---
index: 6
group: true
---

# :speech_balloon: Declarative Transactions

Both, _declarative_ and _programmatic_ transactions are supported, with the former you can just describe the scope of your transactions, with the later you have more flexibility (hence more responsibility).

To use Declarative Transactions (using the `@Transactional` decorator):

1. take any service class, annotate the wanted function with the `@Transactional` decorator.
2. inject the querier instance by decorating one of the function's arguments with `@InjectQuerier`.

```ts
import { Querier } from '@uql/core/type';
import { Transactional, InjectQuerier } from '@uql/core/querier/decorator';

class ConfirmationService {
  @Transactional()
  async confirmAction(confirmation: Confirmation, @InjectQuerier() querier?: Querier) {
    if (confirmation.type === 'register') {
      await querier.insertOne(User, {
        name: confirmation.name,
        email: confirmation.email,
        password: confirmation.password,
      });
    } else {
      await querier.updateOneById(User, confirmation.creatorId, { password: confirmation.password });
    }
    await querier.updateOneById(Confirmation, confirmation.id, { status: CONFIRM_STATUS_VERIFIED });
  }
}

export const confirmationService = new ConfirmationService();

/**
 * then you could just import the constant `confirmationService` in another file,
 * and when you call `confirmAction` function, all the operations there
 * will (automatically) run inside a single transaction
 */
await confirmationService.confirmAction(data);
```
