import type { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { IClient } from '../../models';

export type IClientCreateBody = Omit<IClient, 'id'>;

export type IClientUpdateBody = Partial<IClientCreateBody>;

export type IClientGetParams = Pick<IClient, 'id'>;
export type IClientGetByPhoneParams = Pick<IClient, 'phone'>;
export type IClientGetByEmailParams = Pick<IClient, 'email'>;

export type IClientCreateContext = IHandlerBody<IClientCreateBody>;
export type IClientGetContext = IHandlerParams<IClientGetParams>;
export type IClientGetByPhoneContext = IHandlerParams<IClientGetByPhoneParams>;
export type IClientGetByEmailContext = IHandlerParams<IClientGetByEmailParams>;
export type IClientUpdateContext = IHandlerBodyParams<IClientUpdateBody, IClientGetParams>;
