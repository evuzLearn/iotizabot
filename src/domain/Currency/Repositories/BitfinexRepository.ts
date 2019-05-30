import { GotInstance } from 'got';
import { inject } from 'depsin';

import { CurrencyRepository } from './CurrencyRepository';
import { Inject } from '../../keys.inject';
import { Currency } from '../Entities/Currency';

const URL = 'https://api-pub.bitfinex.com/v2/';
const CACHE_TIME = 60 * 60 * 1000; // 1hour;

export class BitfinexRepository extends CurrencyRepository {
  private prices = new Map<string, Currency>();

  private get http(): GotInstance {
    const { http } = this.config;
    if (!http) {
      throw Error('BitfinexRepository need a http');
    }
    return this.config.http;
  }

  constructor(@inject(Inject.Config) private config: any) {
    super();
  }

  async getIotaPrice(): Promise<Currency> {
    const iotaPrice = this.getPrice('iota');
    if (iotaPrice) {
      console.log('CACHE');
      return Promise.resolve(iotaPrice);
    }

    console.log('NO CACHE');
    const { body } = await this.http.get(`${URL}trades/tIOTUSD/hist?limit=1`, { json: true });
    const currency = this.setPrice('iota', { price: body[0][3], timestamp: body[0][1] });
    return currency;
  }

  private setPrice(currency: string, value: Currency): Currency {
    this.prices.set(currency, value);
    setTimeout(() => {
      this.prices.set(currency, null);
    }, CACHE_TIME);
    return value;
  }

  private getPrice(currency: string): Currency {
    return this.prices.get(currency);
  }
}
