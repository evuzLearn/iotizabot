import { Message } from 'node-telegram-bot-api';
import { Domain } from 'ts-domain';

import { MessageFunctionBot } from '../TelegramBot';
import { DomainUseCases } from '../../domain/types';
import { inject } from 'depsin';
import { Inject } from '../keys.inject';

export class IotaPriceFunctionBot extends MessageFunctionBot {
  regexp = /\/price/;

  constructor(@inject(Inject.Domain) private domain: Domain<DomainUseCases>) {
    super();
  }

  execute = (msg: Message) => {
    const { from } = msg;
    this.domain
      .get({ useCase: 'iotaPrice' })
      .execute()
      .then(price => {
        this.bot.sendMessage(from.id, `Iota price at ${new Date(price.timestamp).toLocaleString()}: ${price.price}$`);
      });
  };
}
