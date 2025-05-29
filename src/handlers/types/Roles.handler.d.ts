import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';

interface IRole {
    id: number;
    name: string;
}

type IRoleCreateBody = Omit<IRole, 'id'>;

interface IRoleCreateContext extends IHandlerBody<IRoleCreateBody> {}

type IRoleGetParams = Pick<IRole, 'id'>;

interface IRoleGetContext extends IHandlerParams<IRoleGetParams> {}

type IRoleUpdateBody = Partial<IRoleCreateBody>;

interface IRoleUpdateContext extends IHandlerBodyParams<IRoleUpdateBody, IRoleGetParams> {}
