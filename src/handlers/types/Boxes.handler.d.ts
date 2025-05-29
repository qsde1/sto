import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';

interface IBox {
    id: number;
    number: string;
    occupied: boolean;
}

type IBoxCreateBody = Omit<IBox, 'id'>;

interface IBoxCreateContext extends IHandlerBody<IBoxCreateBody> {}

type IBoxGetByIdParams = Pick<IBox, 'id'>;
type IBoxGetByNumberParams = Pick<IBox, 'number'>;

interface IBoxGetByIdContext extends IHandlerParams<IBoxGetByIdParams> {}
interface IBoxGetByNumberContext extends IHandlerParams<IBoxGetByNumberParams> {}

type IBoxUpdateBody = Partial<IBoxCreateBody>;

interface IBoxUpdateContext extends IHandlerBodyParams<IBoxUpdateBody, Pick<IBox, 'id'>> {}
