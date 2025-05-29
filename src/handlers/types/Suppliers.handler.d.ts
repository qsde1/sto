import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';

interface ISupplier {
    id: number;
    name: string;
    contacts: string | null;
}

type ISupplierCreateBody = Omit<ISupplier, 'id'>;

type ISupplierUpdateBody = Partial<ISupplierCreateBody>;

type ISupplierGetParams = Pick<ISupplier, 'id'>;
type ISupplierGetByNameParams = Pick<ISupplier, 'name'>;

interface ISupplierCreateContext extends IHandlerBody<ISupplierCreateBody> {}
interface ISupplierGetContext extends IHandlerParams<ISupplierGetParams> {}
interface ISupplierGetByNameContext extends IHandlerParams<ISupplierGetByNameParams> {}
interface ISupplierUpdateContext extends IHandlerBodyParams<ISupplierUpdateBody, Pick<ISupplier, 'id'>> {}
