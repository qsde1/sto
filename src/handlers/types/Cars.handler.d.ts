import type { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { ICar, IModel, CreateCarDTO } from '../../models';


export type ICarCreateContext = IHandlerBody<CreateCarDTO>;

export type ICarGetParams = Pick<ICar, 'id'>;

export type ICarGetParamsContext = IHandlerParams<ICarGetParams>;

export type ICarUpdateBody = Partial<CreateCarDTO & { modelId: IModel['id'] }>;

export type ICarUpdateContext = IHandlerBodyParams<ICarUpdateBody, ICarGetParams>;
