import { TelegramBot } from './bot/TelegramBot';
import { StartFunctionBot } from './bot/listeners/start';

import { domain } from './domain';

const TOKEN = process.env.TELEGRAM_TOKEN;
domain
  .get({ useCase: 'iotaPrice' })
  .execute()
  .then(v => {
    console.log(v);
  });

new TelegramBot([new StartFunctionBot()], TOKEN, { polling: true });
