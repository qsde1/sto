import type { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import type { IPartsWork } from '../../models';

export type IPartWorkCreateBody = Omit<IPartsWork, 'id'>;
export type IPartWorkUpdateBody = Partial<Pick<IPartsWork, 'quantity'>>;

export type IPartWorkGetParams = Pick<IPartsWork, 'workId' | 'partId'>;
export type IPartWorkGetByWorkParams = Pick<IPartsWork, 'workId'>;
export type IPartWorkGetByPartParams = Pick<IPartsWork, 'partId'>;

export type IPartWorkCreateContext = IHandlerBody<IPartWorkCreateBody>;
export type IPartWorkGetContext = IHandlerParams<IPartWorkGetParams>;
export type IPartWorkGetByWorkContext = IHandlerParams<IPartWorkGetByWorkParams>;
export type IPartWorkGetByPartContext = IHandlerParams<IPartWorkGetByPartParams>;
export type IPartWorkUpdateContext = IHandlerBodyParams<IPartWorkUpdateBody, IPartWorkGetParams>;
