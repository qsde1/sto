import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';

interface IWorkCategory {
    id: number;
    name: string;
}

type IWorkCategoryCreateBody = Omit<IWorkCategory, 'id'>;
type IWorkCategoryUpdateBody = Partial<IWorkCategoryCreateBody>;

type IWorkCategoryGetParams = Pick<IWorkCategory, 'id'>;
type IWorkCategoryGetByNameParams = Pick<IWorkCategory, 'name'>;

interface IWorkCategoryCreateContext extends IHandlerBody<IWorkCategoryCreateBody> {}
interface IWorkCategoryGetContext extends IHandlerParams<IWorkCategoryGetParams> {}
interface IWorkCategoryGetByNameContext extends IHandlerParams<IWorkCategoryGetByNameParams> {}
interface IWorkCategoryUpdateContext extends IHandlerBodyParams<IWorkCategoryUpdateBody, Pick<IWorkCategory, 'id'>> {}
