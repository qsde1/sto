import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';

interface IModel {
    id: number;
    name: string;
    brandId: number;
}

type IModelCreateBody = Omit<IModel, 'id'>;
type IModelUpdateBody = Partial<IModelCreateBody>;

type IModelGetParams = Pick<IModel, 'id'>;
type IModelGetByNameParams = Pick<IModel, 'name'>;
type IModelGetByBrandParams = Pick<IModel, 'brandId'>;

interface IModelCreateContext extends IHandlerBody<IModelCreateBody> {}
interface IModelGetContext extends IHandlerParams<IModelGetParams> {}
interface IModelGetByNameContext extends IHandlerParams<IModelGetByNameParams> {}
interface IModelGetByBrandContext extends IHandlerParams<IModelGetByBrandParams> {}
interface IModelUpdateContext extends IHandlerBodyParams<IModelUpdateBody, Pick<IModel, 'id'>> {}
