import { TelegramBot } from './bot/TelegramBot';
import { StartFunctionBot } from './bot/listeners/start';

const TOKEN = process.env.TELEGRAM_TOKEN;

new TelegramBot([new StartFunctionBot()], TOKEN, { polling: true });
