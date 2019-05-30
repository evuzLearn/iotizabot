import { Currency } from '../Entities/Currency';

export abstract class CurrencyRepository {
  abstract getIotaPrice(): Promise<Currency>;
}
