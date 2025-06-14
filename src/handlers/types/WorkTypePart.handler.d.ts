import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import { IPart } from './Parts.handler';
import { IWorkType } from './WorkTypes.handler';

export type IWorktypePart = {
    worktypeId: number;
    partId: number;
    quantity: number;
};

export type IWorktypePartWithPartAndWorkType = IWorktypePart & {
    part: IPart;
    workType: IWorkType;
};

export type IWorktypePartCreateBody = Omit<IWorktypePart, never>;
export type IWorktypePartUpdateBody = Partial<Pick<IWorktypePart, 'quantity'>>;

export type IWorktypePartGetParams = Pick<IWorktypePart, 'worktypeId' | 'partId'>;
export type IWorktypePartGetByWorktypeParams = Pick<IWorktypePart, 'worktypeId'>;
export type IWorktypePartGetByPartParams = Pick<IWorktypePart, 'partId'>;

export type IWorktypePartCreateContext = IHandlerBody<IWorktypePartCreateBody>;
export type IWorktypePartGetContext = IHandlerParams<IWorktypePartGetParams>;
export type IWorktypePartGetByWorktypeContext = IHandlerParams<IWorktypePartGetByWorktypeParams>;
export type IWorktypePartGetByPartContext = IHandlerParams<IWorktypePartGetByPartParams>;
export type IWorktypePartUpdateContext = IHandlerBodyParams<IWorktypePartUpdateBody, IWorktypePartGetParams>;
