import type { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { IClientCar, CreateClientCarDTO, UpdateClientCarDTO } from '../../models';

export type IClientCarGetParams = Pick<IClientCar, 'clientId' | 'carId'>;
export type IClientCarGetByClientParams = Pick<IClientCar, 'clientId'>;
export type IClientCarGetByCarParams = Pick<IClientCar, 'carId'>;

export type IClientCarCreateContext = IHandlerBody<CreateClientCarDTO>;
export type IClientCarGetContext = IHandlerParams<IClientCarGetParams>;
export type IClientCarGetByClientContext = IHandlerParams<IClientCarGetByClientParams>;
export type IClientCarGetByCarContext = IHandlerParams<IClientCarGetByCarParams>;
export type IClientCarUpdateContext = IHandlerBodyParams<UpdateClientCarDTO, IClientCarGetParams>; 