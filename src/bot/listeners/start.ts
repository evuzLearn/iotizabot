import { Message } from 'node-telegram-bot-api';

import { MessageFunctionBot } from '../TelegramBot';

export class StartFunctionBot extends MessageFunctionBot {
  regexp = /\/start/;
  execute = (msg: Message) => {
    const { from } = msg;
    this.bot.sendMessage(from.id, `Hello ${from.first_name}`);
  };
}
