import { DepInjection } from 'depsin';
import { Inject } from './keys.inject';

import { StartFunctionBot } from './listeners/start';
import { IotaPriceFunctionBot } from './listeners/iotaPrice';
import { domain } from '../domain/index';
import { TelegramBot } from './TelegramBot';

const TOKEN = process.env.TELEGRAM_TOKEN;

export function run() {
  const botContainer = new DepInjection(
    {
      [Inject.Start]: StartFunctionBot,
      [Inject.IotaPrice]: IotaPriceFunctionBot,
    },
    { [Inject.Domain]: domain },
  );
  new TelegramBot([botContainer.get(Inject.Start), botContainer.get(Inject.IotaPrice)], TOKEN, { polling: true });
}
