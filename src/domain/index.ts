import { DepInjection } from 'depsin';
import { Domain } from 'ts-domain';
import got from 'got';

import { Inject } from './keys.inject';
import { IotaPriceUseCase } from './Currency/UseCase/IotaPriceUseCase';
import { BitfinexRepository } from './Currency/Repositories/BitfinexRepository';

const config = { http: got };
const domainContainer = new DepInjection(
  {
    [Inject.CurrencyRepository]: BitfinexRepository,
    [Inject.IotaPriceUseCase]: IotaPriceUseCase,
  },
  {
    [Inject.Config]: config,
  },
);

export const useCases = {
  iotaPrice: domainContainer.get<IotaPriceUseCase>(Inject.IotaPriceUseCase),
};

export const domain = new Domain({ useCases, config });
