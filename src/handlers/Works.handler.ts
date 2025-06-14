import type {
    IWorkCreateContext,
    IWorkGetContext,
    IWorkUpdateContext,
    IWorkGetByApplicationContext,
    IWorkGetByUserContext,
    IWorkGetByWorktypeContext,
} from './types/Works.handler';
import { WorkModel, ApplicationModel, UserModel, WorkTypeModel, IWorkWithDependencies, CreateWorkDTO } from '../models';
import { httpErrors } from '../services/httpErrors';

export default {
    async list(): Promise<IWorkWithDependencies[]> {
        return await WorkModel.getAll();
    },

    async getOne({ set, params }: IWorkGetContext): Promise<IWorkWithDependencies | null> {
        return await WorkModel.getById(params.id) ?? null;
    },

    async getByApplication({ set, params }: IWorkGetByApplicationContext): Promise<IWorkWithDependencies[] | null> {
        return await WorkModel.getByApplicationId(params.idApplication) ?? null;
    },

    async getByUser({ set, params }: IWorkGetByUserContext): Promise<IWorkWithDependencies[] | null> {
        return await WorkModel.getByUserId(params.idUser) ?? null;
    },

    async getByWorktype({ set, params }: IWorkGetByWorktypeContext): Promise<IWorkWithDependencies[] | null> {
        return await WorkModel.getByWorkTypeId(params.idWorktype) ?? null;
    },

    async create({ set, body }: IWorkCreateContext): Promise<IWorkWithDependencies | { error: string } | null> {
        const application = await ApplicationModel.getById(body.idApplication);
        if (!application) {
            set.status = 404;
            return httpErrors.applications[404];
        }

        const user = await UserModel.getById(body.idUser);
        if (!user) {
            set.status = 404;
            return httpErrors.users[404];
        }

        const workType = await WorkTypeModel.getById(body.idWorktype);
        if (!workType) {
            set.status = 404;
            return httpErrors.workTypes[404];
        }

            const workData: CreateWorkDTO = {
                ...body,
                startDate: new Date().getTime(),
            };
            const newWork = await WorkModel.create(workData);
        return await WorkModel.getById(newWork.id) ?? null;
    },

    async update({ set, params, body }: IWorkUpdateContext): Promise<IWorkWithDependencies | { error: string } | null> {
        const work = await WorkModel.getById(params.id);
        if (!work) {
            set.status = 404;
            return httpErrors.works[404];
        }

        if (body.idUser) {
            const user = await UserModel.getById(body.idUser);
            if (!user) {
                set.status = 404;
                return httpErrors.users[404];
            }
        }

        if (Object.keys(body).length > 0) {
                await WorkModel.update(params.id, body);
                return await WorkModel.getById(params.id) ?? null;
        }

        return work;
    },

    async delete({ set, params }: IWorkGetContext): Promise<IWorkWithDependencies | null> {
        return await WorkModel.delete(params.id) ?? null;
    },
};
