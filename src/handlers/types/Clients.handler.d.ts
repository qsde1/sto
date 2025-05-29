import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';

interface IClient {
    id: number;
    name: string;
    phone: string;
    email: string;
}

type IClientCreateBody = Omit<IClient, 'id'>;

type IClientUpdateBody = Partial<IClientCreateBody>;

type IClientGetParams = Pick<IClient, 'id'>;
type IClientGetByPhoneParams = Pick<IClient, 'phone'>;
type IClientGetByEmailParams = Pick<IClient, 'email'>;

interface IClientCreateContext extends IHandlerBody<IClientCreateBody> {}
interface IClientGetContext extends IHandlerParams<IClientGetParams> {}
interface IClientGetByPhoneContext extends IHandlerParams<IClientGetByPhoneParams> {}
interface IClientGetByEmailContext extends IHandlerParams<IClientGetByEmailParams> {}
interface IClientUpdateContext extends IHandlerBodyParams<IClientUpdateBody, IClientGetParams> {}
