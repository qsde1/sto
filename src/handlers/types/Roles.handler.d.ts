import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { IRole } from '../../models';

export type IRoleCreateBody = Omit<IRole, 'id'>;

export type IRoleCreateContext = IHandlerBody<IRoleCreateBody>;

export type IRoleGetParams = Pick<IRole, 'id'>;

export type IRoleGetContext = IHandlerParams<IRoleGetParams>;

export type IRoleUpdateBody = Partial<IRoleCreateBody>;

export type IRoleUpdateContext = IHandlerBodyParams<IRoleUpdateBody, IRoleGetParams>;
