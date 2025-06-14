import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { IApplication, ICar, IStatus, IUser, IBox, CreateApplicationDTO, UpdateApplicationDTO } from '../../models';


export type IApplicationGetParams = Pick<IApplication, 'id'>;
export type IApplicationGetByCarParams = Pick<IApplication, 'idCar'>;
export type IApplicationGetByStatusParams = Pick<IApplication, 'idStatus'>;
export type IApplicationGetByUserParams = Pick<IApplication, 'idUser'>;
export type IApplicationGetByBoxParams = Pick<IApplication, 'idBox'>;

export type IApplicationCreateContext = IHandlerBody<CreateApplicationDTO>;
export type IApplicationGetContext = IHandlerParams<IApplicationGetParams>;
export type IApplicationGetByCarContext = IHandlerParams<IApplicationGetByCarParams>;
export type IApplicationGetByStatusContext = IHandlerParams<IApplicationGetByStatusParams>;
export type IApplicationGetByUserContext = IHandlerParams<IApplicationGetByUserParams>;
export type IApplicationGetByBoxContext = IHandlerParams<IApplicationGetByBoxParams>;
export type IApplicationUpdateContext = IHandlerBodyParams<UpdateApplicationDTO, Pick<IApplication, 'id'>>;
