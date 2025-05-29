import { IBox } from './Boxes.handler';
import { ICar } from './Cars.handler';
import { IHandler, IHandlerBody, IHandlerBodyParams, IHandlerParams } from './handlers';
import { IStatus } from './Statuses.handler';
import { IUser } from './Users.handler';

interface IApplication {
    id: number;
    createdAt: Date;
    clientComment: string | null;
    idCar: number;
    idStatus: number;
    idUser: number;
    startDate: number;
    closeDate: Date | null;
    idBox: number | null;
    price: number | null;
}

interface IApplicationWithDependencies extends IApplication {
    car: ICar;
    status: IStatus;
    user: IUser;
    box: IBox;
}

type IApplicationCreateBody = Omit<IApplication, 'id' | 'createdAt'>;
type IApplicationUpdateBody = Partial<Omit<IApplicationCreateBody, 'idCar' | 'idUser'>>;

type IApplicationGetParams = Pick<IApplication, 'id'>;
type IApplicationGetByCarParams = Pick<IApplication, 'idCar'>;
type IApplicationGetByStatusParams = Pick<IApplication, 'idStatus'>;
type IApplicationGetByUserParams = Pick<IApplication, 'idUser'>;
type IApplicationGetByBoxParams = Pick<IApplication, 'idBox'>;

interface IApplicationCreateContext extends IHandlerBody<IApplicationCreateBody> {}
interface IApplicationGetContext extends IHandlerParams<IApplicationGetParams> {}
interface IApplicationGetByCarContext extends IHandlerParams<IApplicationGetByCarParams> {}
interface IApplicationGetByStatusContext extends IHandlerParams<IApplicationGetByStatusParams> {}
interface IApplicationGetByUserContext extends IHandlerParams<IApplicationGetByUserParams> {}
interface IApplicationGetByBoxContext extends IHandlerParams<IApplicationGetByBoxParams> {}
interface IApplicationUpdateContext extends IHandlerBodyParams<IApplicationUpdateBody, Pick<IApplication, 'id'>> {}
