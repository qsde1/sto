import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { IWorkType, IWorkCategory } from '../../models';

export type IWorkTypeWithCategory = IWorkType & {
    category: IWorkCategory;
}

export type IWorkTypeCreateBody = Omit<IWorkType, 'id'>;
export type IWorkTypeUpdateBody = Partial<IWorkTypeCreateBody>;

export type IWorkTypeGetParams = Pick<IWorkType, 'id'>;
export type IWorkTypeGetByNameParams = Pick<IWorkType, 'name'>;
export type IWorkTypeGetByCategoryParams = Pick<IWorkType, 'categoryId'>;

export type IWorkTypeCreateContext = IHandlerBody<IWorkTypeCreateBody>;
export type IWorkTypeGetContext = IHandlerParams<IWorkTypeGetParams>;
export type IWorkTypeGetByNameContext = IHandlerParams<IWorkTypeGetByNameParams>;
export type IWorkTypeGetByCategoryContext = IHandlerParams<IWorkTypeGetByCategoryParams>;
export type IWorkTypeUpdateContext = IHandlerBodyParams<IWorkTypeUpdateBody, IWorkTypeGetParams>;
