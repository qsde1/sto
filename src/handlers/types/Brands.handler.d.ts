import type { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { IBrand } from '../../models';

export type IBrandGetParams = Pick<IBrand, 'id'>;
export type IBrandGetByNameParams = Pick<IBrand, 'name'>;
export type IBrandCreateBody = Pick<IBrand, 'name'>;
export type IBrandUpdateBody = Partial<IBrandCreateBody>;

export type IBrandCreateContext = IHandlerBody<IBrandCreateBody>;
export type IBrandGetContext = IHandlerParams<IBrandGetParams>;
export type IBrandGetByNameContext = IHandlerParams<IBrandGetByNameParams>;
export type IBrandUpdateContext = IHandlerBodyParams<IBrandUpdateBody, Pick<IBrand, 'id'>>;
