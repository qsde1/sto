import type { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { IModel } from '../../models';

export type IModelCreateBody = Omit<IModel, 'id'>;
export type IModelUpdateBody = Partial<IModelCreateBody>;

export type IModelGetParams = Pick<IModel, 'id'>;
export type IModelGetByNameParams = Pick<IModel, 'name'>;
export type IModelGetByBrandParams = Pick<IModel, 'brandId'>;

export type IModelCreateContext = IHandlerBody<IModelCreateBody>;
export type IModelGetContext = IHandlerParams<IModelGetParams>;
export type IModelGetByNameContext = IHandlerParams<IModelGetByNameParams>;
export type IModelGetByBrandContext = IHandlerParams<IModelGetByBrandParams>;
export type IModelUpdateContext = IHandlerBodyParams<IModelUpdateBody, Pick<IModel, 'id'>>;
