---
weight: 170
description: This tutorial explain how to use declarative transactions with the nukak orm.
---

## Declarative transactions

Both, [Declarative](/docs/transactions-declarative) and [Imperative](/docs/transactions-imperative) `transactions` are supported for flexibility, with the former you can just _describe_ the scope of your transactions, with the later you have more flexibility to programmatically specify the lifecycle of a transaction.

Use `Declarative` transactions as below:

1. take any service class, annotate the wanted function with the `@Transactional` decorator.
2. inject the querier instance by decorating one of the function's arguments with `@InjectQuerier`.

```ts
import { Querier } from 'nukak';
import { Transactional, InjectQuerier } from 'nukak/querier';
import { User, Confirmation } from './shared/models/index.js';

export class ConfirmationService {
  @Transactional()
  async confirm(confirmation: Confirmation, @InjectQuerier() querier?: Querier): Promise<void> {
    if (confirmation.type === 'register') {
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
