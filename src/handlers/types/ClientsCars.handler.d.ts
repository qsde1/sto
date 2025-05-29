import { ICar } from './Cars.handler';
import { IClient } from './Clients.handler';
import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';

interface IClientCar {
    carId: number;
    clientId: number;
    createdAt: Date;
    archivedAt: Date | null;
}

interface IClientCarWithClientAndCar extends IClientCar {
    client: IClient;
    car: ICar;
}

type IClientCarCreateBody = Omit<IClientCar, 'createdAt' | 'archivedAt'>;
type IClientCarUpdateBody = Partial<Pick<IClientCar, 'archivedAt'>>;

type IClientCarGetParams = Pick<IClientCar, 'clientId' | 'carId'>;
type IClientCarGetByClientParams = Pick<IClientCar, 'clientId'>;
type IClientCarGetByCarParams = Pick<IClientCar, 'carId'>;

interface IClientCarCreateContext extends IHandlerBody<IClientCarCreateBody> {}
interface IClientCarGetContext extends IHandlerParams<IClientCarGetParams> {}
interface IClientCarGetByClientContext extends IHandlerParams<IClientCarGetByClientParams> {}
interface IClientCarGetByCarContext extends IHandlerParams<IClientCarGetByCarParams> {}
interface IClientCarUpdateContext extends IHandlerBodyParams<IClientCarUpdateBody, IClientCarGetParams> {}
