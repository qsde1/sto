import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';

interface IPartWork {
    workId: number;
    partId: number;
    quantity: number;
}

type IPartWorkCreateBody = Omit<IPartWork, never>;
type IPartWorkUpdateBody = Partial<Pick<IPartWork, 'quantity'>>;

type IPartWorkGetParams = Pick<IPartWork, 'workId' | 'partId'>;
type IPartWorkGetByWorkParams = Pick<IPartWork, 'workId'>;
type IPartWorkGetByPartParams = Pick<IPartWork, 'partId'>;

interface IPartWorkCreateContext extends IHandlerBody<IPartWorkCreateBody> {}
interface IPartWorkGetContext extends IHandlerParams<IPartWorkGetParams> {}
interface IPartWorkGetByWorkContext extends IHandlerParams<IPartWorkGetByWorkParams> {}
interface IPartWorkGetByPartContext extends IHandlerParams<IPartWorkGetByPartParams> {}
interface IPartWorkUpdateContext extends IHandlerBodyParams<IPartWorkUpdateBody, IPartWorkGetParams> {}
