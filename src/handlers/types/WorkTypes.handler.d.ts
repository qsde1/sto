import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import { IWorkCategory } from './WorkCategories.handler';

interface IWorkType {
    id: number;
    name: string;
    price: number;
    categoryId: number;
}

interface IWorkTypeWithCategory extends IWorkType {
    category: IWorkCategory;
}

type IWorkTypeCreateBody = Omit<IWorkType, 'id'>;
type IWorkTypeUpdateBody = Partial<IWorkTypeCreateBody>;

type IWorkTypeGetParams = Pick<IWorkType, 'id'>;
type IWorkTypeGetByNameParams = Pick<IWorkType, 'name'>;
type IWorkTypeGetByCategoryParams = Pick<IWorkType, 'categoryId'>;

interface IWorkTypeCreateContext extends IHandlerBody<IWorkTypeCreateBody> {}
interface IWorkTypeGetContext extends IHandlerParams<IWorkTypeGetParams> {}
interface IWorkTypeGetByNameContext extends IHandlerParams<IWorkTypeGetByNameParams> {}
interface IWorkTypeGetByCategoryContext extends IHandlerParams<IWorkTypeGetByCategoryParams> {}
interface IWorkTypeUpdateContext extends IHandlerBodyParams<IWorkTypeUpdateBody, IWorkTypeGetParams> {}
