import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { ISupplier } from '../../models';

export type ISupplierCreateBody = Omit<ISupplier, 'id'>;

export type ISupplierUpdateBody = Partial<ISupplierCreateBody>;

export type ISupplierGetParams = Pick<ISupplier, 'id'>;
export type ISupplierGetByNameParams = Pick<ISupplier, 'name'>;

export type ISupplierCreateContext = IHandlerBody<ISupplierCreateBody>;
export type ISupplierGetContext = IHandlerParams<ISupplierGetParams>;
export type ISupplierGetByNameContext = IHandlerParams<ISupplierGetByNameParams>;
export type ISupplierUpdateContext = IHandlerBodyParams<ISupplierUpdateBody, Pick<ISupplier, 'id'>>;
