import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';

interface IBrand {
    id: number;
    name: string;
}

type IBrandGetParams = Pick<IBrand, 'id'>;
type IBrandGetByNameParams = Pick<IBrand, 'name'>;
type IBrandCreateBody = Pick<IBrand, 'name'>;
type IBrandUpdateBody = Partial<IBrandCreateBody>;

interface IBrandCreateContext extends IHandlerBody<IBrandCreateBody> {}
interface IBrandGetContext extends IHandlerParams<IBrandGetParams> {}
interface IBrandGetByNameContext extends IHandlerParams<IBrandGetByNameParams> {}
interface IBrandUpdateContext extends IHandlerBodyParams<IBrandUpdateBody, Pick<IBrand, 'id'>> {}
