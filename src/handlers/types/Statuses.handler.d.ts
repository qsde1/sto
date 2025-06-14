import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { IStatus } from '../../models';

export type IStatusCreateBody = Omit<IStatus, 'id'>;

export type IStatusCreateContext = IHandlerBody<IStatusCreateBody>;

export type IStatusGetParams = Pick<IStatus, 'id'>;

export type IStatusGetContext = IHandlerParams<IStatusGetParams>;

export type IStatusUpdateBody = Partial<IStatusCreateBody>;

export type IStatusUpdateContext = IHandlerBodyParams<IStatusUpdateBody, IStatusGetParams>;
