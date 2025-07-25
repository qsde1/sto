import type { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { IClientCar, IClient, ICar } from '../../models';

export type IClientCarWithClientAndCar = IClientCar & {
    client: IClient;
    car: ICar;
}

export type IClientCarCreateBody = Omit<IClientCar, 'createdAt' | 'archivedAt'>;
export type IClientCarUpdateBody = Partial<Pick<IClientCar, 'archivedAt'>>;

export type IClientCarGetParams = Pick<IClientCar, 'clientId' | 'carId'>;
export type IClientCarGetByClientParams = Pick<IClientCar, 'clientId'>;
export type IClientCarGetByCarParams = Pick<IClientCar, 'carId'>;

export type IClientCarCreateContext = IHandlerBody<IClientCarCreateBody>;
export type IClientCarGetContext = IHandlerParams<IClientCarGetParams>;
export type IClientCarGetByClientContext = IHandlerParams<IClientCarGetByClientParams>;
export type IClientCarGetByCarContext = IHandlerParams<IClientCarGetByCarParams>;
export type IClientCarUpdateContext = IHandlerBodyParams<IClientCarUpdateBody, IClientCarGetParams>;
