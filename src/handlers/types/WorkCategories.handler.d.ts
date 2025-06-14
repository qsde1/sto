import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { IWorkCategory, CreateWorkCategoryDTO, UpdateWorkCategoryDTO } from '../../models';

export type IWorkCategoryCreateBody = CreateWorkCategoryDTO;
export type IWorkCategoryUpdateBody = UpdateWorkCategoryDTO;

export type IWorkCategoryGetParams = Pick<IWorkCategory, 'id'>;
export type IWorkCategoryGetByNameParams = Pick<IWorkCategory, 'name'>;

export type IWorkCategoryCreateContext = IHandlerBody<IWorkCategoryCreateBody>;
export type IWorkCategoryGetContext = IHandlerParams<IWorkCategoryGetParams>;
export type IWorkCategoryGetByNameContext = IHandlerParams<IWorkCategoryGetByNameParams>;
export type IWorkCategoryUpdateContext = IHandlerBodyParams<IWorkCategoryUpdateBody, Pick<IWorkCategory, 'id'>>;
