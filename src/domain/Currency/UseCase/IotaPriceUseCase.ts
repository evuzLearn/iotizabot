import { IUseCase } from 'ts-domain';
import { inject } from 'depsin';

import { Inject } from '../../keys.inject';
import { CurrencyRepository } from '../Repositories/CurrencyRepository';

export class IotaPriceUseCase implements IUseCase {
  constructor(@inject(Inject.CurrencyRepository) private currencyRepository: CurrencyRepository) {}

  execute() {
    return this.currencyRepository.getIotaPrice();
  }
}
