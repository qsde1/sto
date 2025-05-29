import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';

interface IStatus {
    id: number;
    name: string;
}

type IStatusCreateBody = Omit<IStatus, 'id'>;

interface IStatusCreateContext extends IHandlerBody<IStatusCreateBody> {}

type IStatusGetParams = Pick<IStatus, 'id'>;

interface IStatusGetContext extends IHandlerParams<IStatusGetParams> {}

type IStatusUpdateBody = Partial<IStatusCreateBody>;

interface IStatusUpdateContext extends IHandlerBodyParams<IStatusUpdateBody, IStatusGetParams> {}
