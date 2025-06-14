import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { IWork, CreateWorkDTO, UpdateWorkDTO } from '../../models';

export type IWorkCreateBody = CreateWorkDTO;
export type IWorkUpdateBody = UpdateWorkDTO;

export type IWorkGetParams = Pick<IWork, 'id'>;
export type IWorkGetByApplicationParams = Pick<IWork, 'idApplication'>;
export type IWorkGetByUserParams = Pick<IWork, 'idUser'>;
export type IWorkGetByWorktypeParams = Pick<IWork, 'idWorktype'>;

export type IWorkCreateContext = IHandlerBody<IWorkCreateBody>;
export type IWorkGetContext = IHandlerParams<IWorkGetParams>;
export type IWorkGetByApplicationContext = IHandlerParams<IWorkGetByApplicationParams>;
export type IWorkGetByUserContext = IHandlerParams<IWorkGetByUserParams>;
export type IWorkGetByWorktypeContext = IHandlerParams<IWorkGetByWorktypeParams>;
export type IWorkUpdateContext = IHandlerBodyParams<IWorkUpdateBody, Pick<IWork, 'id'>>;
