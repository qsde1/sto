import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';

interface IWork {
    id: number;
    idApplication: number;
    idUser: number;
    idWorktype: number;
    startDate: Date;
    endDate: Date | null;
    comments: string | null;
}

type IWorkCreateBody = Omit<IWork, 'id'>;
type IWorkUpdateBody = Partial<Omit<IWorkCreateBody, 'idApplication' | 'idWorktype'>>;

type IWorkGetParams = Pick<IWork, 'id'>;
type IWorkGetByApplicationParams = Pick<IWork, 'idApplication'>;
type IWorkGetByUserParams = Pick<IWork, 'idUser'>;
type IWorkGetByWorktypeParams = Pick<IWork, 'idWorktype'>;

interface IWorkCreateContext extends IHandlerBody<IWorkCreateBody> {}
interface IWorkGetContext extends IHandlerParams<IWorkGetParams> {}
interface IWorkGetByApplicationContext extends IHandlerParams<IWorkGetByApplicationParams> {}
interface IWorkGetByUserContext extends IHandlerParams<IWorkGetByUserParams> {}
interface IWorkGetByWorktypeContext extends IHandlerParams<IWorkGetByWorktypeParams> {}
interface IWorkUpdateContext extends IHandlerBodyParams<IWorkUpdateBody, Pick<IWork, 'id'>> {}
