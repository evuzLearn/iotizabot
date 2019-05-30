import TelegramBotAPI, { ConstructorOptions } from 'node-telegram-bot-api';
import { FunctionBot } from './FunctionBot';

export class TelegramBot extends TelegramBotAPI {
  constructor(functions: FunctionBot[], token: string, options?: ConstructorOptions) {
    super(token, options);
    functions.forEach(fn => {
      fn.register(this);
    });
  }
}
