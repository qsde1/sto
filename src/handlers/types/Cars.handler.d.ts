import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { IModel } from './Models.handler';

interface ICar {
    id: number;
    number: string;
    year: string;
    volumeEngine: number;
    vin: string;
    color: string;
    type: string;
    modelId: IModel['id'];
}

type ICarCreateBody = Omit<ICar, 'id' | 'volumeEngine' | 'type' | 'year' | 'modelId'>;

interface ICarCreateContext extends IHandlerBody<ICarCreateBody> {}

type ICarGetParams = Pick<ICar, 'id'>;

interface ICarGetParamsContext extends IHandlerParams<ICarGetParams> {}

type ICarUpdateBody = Partial<ICarCreateBody & { modelId: ICar['modelId'] }>;

interface ICarUpdateContext extends IHandlerBodyParams<ICarUpdateBody, ICarGetParams> {}
