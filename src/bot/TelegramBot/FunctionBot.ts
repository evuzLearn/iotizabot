import TelegramBot, { Message } from 'node-telegram-bot-api';

export abstract class FunctionBot {
  protected bot: TelegramBot;
  abstract register(bot: TelegramBot): void;
}

export abstract class MessageFunctionBot extends FunctionBot {
  abstract regexp: RegExp;
  abstract execute: (msg: Message, match: RegExpExecArray) => void;
  register(bot: TelegramBot) {
    this.bot = bot;
    bot.onText(this.regexp, this.execute);
  }
}
