import type { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { IBox } from '../../models';

export type IBoxCreateBody = Omit<IBox, 'id'>;

export type IBoxCreateContext = IHandlerBody<IBoxCreateBody>;

export type IBoxGetByIdParams = Pick<IBox, 'id'>;
export type IBoxGetByNumberParams = Pick<IBox, 'number'>;

export type IBoxGetByIdContext = IHandlerParams<IBoxGetByIdParams>;
export type IBoxGetByNumberContext = IHandlerParams<IBoxGetByNumberParams>;

export type IBoxUpdateBody = Partial<IBoxCreateBody>;

export type IBoxUpdateContext = IHandlerBodyParams<IBoxUpdateBody, Pick<IBox, 'id'>>;
