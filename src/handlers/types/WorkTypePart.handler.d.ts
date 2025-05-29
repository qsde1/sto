import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import { IPart } from './Parts.handler';
import { IWorkType } from './WorkTypes.handler';

interface IWorktypePart {
    worktypeId: number;
    partId: number;
    quantity: number;
}

interface IWorktypePartWithPartAndWorkType extends IWorktypePart {
    part: IPart;
    workType: IWorkType;
}

type IWorktypePartCreateBody = Omit<IWorktypePart, never>;
type IWorktypePartUpdateBody = Partial<Pick<IWorktypePart, 'quantity'>>;

type IWorktypePartGetParams = Pick<IWorktypePart, 'worktypeId' | 'partId'>;
type IWorktypePartGetByWorktypeParams = Pick<IWorktypePart, 'worktypeId'>;
type IWorktypePartGetByPartParams = Pick<IWorktypePart, 'partId'>;

interface IWorktypePartCreateContext extends IHandlerBody<IWorktypePartCreateBody> {}
interface IWorktypePartGetContext extends IHandlerParams<IWorktypePartGetParams> {}
interface IWorktypePartGetByWorktypeContext extends IHandlerParams<IWorktypePartGetByWorktypeParams> {}
interface IWorktypePartGetByPartContext extends IHandlerParams<IWorktypePartGetByPartParams> {}
interface IWorktypePartUpdateContext extends IHandlerBodyParams<IWorktypePartUpdateBody, IWorktypePartGetParams> {}
