import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { IRole } from './Roles.types';

interface IUser {
    id: number;
    name: string;
    login: string;
    password: string;
    email: string;
    phone: string;
    roleId: IRole['id'] | null;
}

type IUserCreateBody = Omit<IUser, 'id'>;

interface IUserCreateContext extends IHandlerBody<IUserCreateBody> {}

type IUserGetParams = Pick<IUser, 'id'>;
type IUserGetByLoginParams = Pick<IUser, 'login'>;
type IUserGetByEmailParams = Pick<IUser, 'email'>;
type IUserGetByPhoneParams = Pick<IUser, 'phone'>;

interface IUserGetContext extends IHandlerParams<IUserGetParams> {}
interface IUserGetByLoginContext extends IHandlerParams<IUserGetByLoginParams> {}
interface IUserGetByEmailContext extends IHandlerParams<IUserGetByEmailParams> {}
interface IUserGetByPhoneContext extends IHandlerParams<IUserGetByPhoneParams> {}

type IUserUpdateBody = Partial<Omit<IUser, 'id'>>;

interface IUserUpdateContext extends IHandlerBodyParams<IUserUpdateBody, Pick<IUser, 'id'>> {}
