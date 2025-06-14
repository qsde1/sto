import type { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { IPart, ISupplier } from '../../models';

export type IPartWithSuppliers = IPart & {
    supplier: ISupplier | null;
}

export type IPartCreateBody = Omit<IPart, 'id'>;
export type IPartUpdateBody = Partial<IPartCreateBody>;

export type IPartGetParams = Pick<IPart, 'id'>;
export type IPartGetByNameParams = Pick<IPart, 'name'>;
export type IPartGetBySupplierParams = Pick<IPart, 'idSuppliers'>;

export type IPartCreateContext = IHandlerBody<IPartCreateBody>;
export type IPartGetContext = IHandlerParams<IPartGetParams>;
export type IPartGetByNameContext = IHandlerParams<IPartGetByNameParams>;
export type IPartGetBySupplierContext = IHandlerParams<IPartGetBySupplierParams>;
export type IPartUpdateContext = IHandlerBodyParams<IPartUpdateBody, Pick<IPart, 'id'>>;
