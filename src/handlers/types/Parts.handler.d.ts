import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import { ISupplier } from './Suppliers.handler';

interface IPart {
    id: number;
    name: string;
    price: number;
    idSuppliers: number | null;
    manufacturer: string | null;
    quantity: number;
}

interface IPartWithSuppliers extends IPart {
    supplier: ISupplier | null;
}

type IPartCreateBody = Omit<IPart, 'id'>;
type IPartUpdateBody = Partial<IPartCreateBody>;

type IPartGetParams = Pick<IPart, 'id'>;
type IPartGetByNameParams = Pick<IPart, 'name'>;
type IPartGetBySupplierParams = Pick<IPart, 'idSuppliers'>;

interface IPartCreateContext extends IHandlerBody<IPartCreateBody> {}
interface IPartGetContext extends IHandlerParams<IPartGetParams> {}
interface IPartGetByNameContext extends IHandlerParams<IPartGetByNameParams> {}
interface IPartGetBySupplierContext extends IHandlerParams<IPartGetBySupplierParams> {}
interface IPartUpdateContext extends IHandlerBodyParams<IPartUpdateBody, Pick<IPart, 'id'>> {}
