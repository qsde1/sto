import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { IUser, IUserWithRole, IRole } from '../../models';

export type IUserCreateBody = Omit<IUserWithRole, 'id'>;

export type IUserCreateContext = IHandlerBody<IUserCreateBody>;

export type IUserGetParams = Pick<IUserWithRole, 'id'>;
export type IUserGetByLoginParams = Pick<IUserWithRole, 'login'>;
export type IUserGetByEmailParams = Pick<IUserWithRole, 'email'>;
export type IUserGetByPhoneParams = Pick<IUserWithRole, 'phone'>;

export type IUserGetContext = IHandlerParams<IUserGetParams>;
export type IUserGetByLoginContext = IHandlerParams<IUserGetByLoginParams>;
export type IUserGetByEmailContext = IHandlerParams<IUserGetByEmailParams>;
export type IUserGetByPhoneContext = IHandlerParams<IUserGetByPhoneParams>;

export type IUserUpdateBody = Partial<Omit<IUserWithRole, 'id'>>;

export type IUserUpdateContext = IHandlerBodyParams<IUserUpdateBody, Pick<IUserWithRole, 'id'>>;
