import type {
    IWorkTypeCreateContext,
    IWorkTypeGetContext,
    IWorkTypeUpdateContext,
    IWorkTypeGetByNameContext,
    IWorkTypeGetByCategoryContext,
    IWorkTypeWithCategory,
} from './types/WorkTypes.handler';
import { WorkTypeModel, WorkCategoryModel, IWorkType } from '../models';
import { httpErrors } from '../services/httpErrors';

export default {
    async list(): Promise<IWorkTypeWithCategory[]> {
        return await WorkTypeModel.getAll();
    },

    async getOne({ set, params }: IWorkTypeGetContext): Promise<IWorkTypeWithCategory | null> {
        return await WorkTypeModel.getById(params.id) ?? null;
    },

    async getByName({ set, params }: IWorkTypeGetByNameContext): Promise<IWorkTypeWithCategory | null> {
        return await WorkTypeModel.getByName(params.name) ?? null;
    },

    async getByCategory({ set, params }: IWorkTypeGetByCategoryContext): Promise<IWorkTypeWithCategory[] | null> {
        return await WorkTypeModel.getByCategoryId(params.categoryId) ?? null;
    },

    async create({ set, body }: IWorkTypeCreateContext): Promise<IWorkType | { error: string }> {
        if (body.categoryId) {
            const category = await WorkCategoryModel.getById(body.categoryId);
            if (!category) {
                set.status = 400;
                return httpErrors.workCategories[404];
            }
        }

        try {
            const newWorkType = await WorkTypeModel.create(body);
            return newWorkType;
        } catch (e) {
            set.status = 409;
            return httpErrors.workTypes[409];
        }
    },

    async update({ set, params, body }: IWorkTypeUpdateContext): Promise<IWorkType | { error: string }> {
        const workType = await WorkTypeModel.getById(params.id);
        if (!workType) {
            set.status = 404;
            return httpErrors.workTypes[404];
        }

        if (body.categoryId) {
            const category = await WorkCategoryModel.getById(body.categoryId);
            if (!category) {
                set.status = 400;
                return httpErrors.workCategories[404];
            }
        }

        if (Object.keys(body).length > 0) {
            try {
                const updatedWorkType = await WorkTypeModel.update(params.id, body);
                return updatedWorkType!;
            } catch (e) {
                set.status = 409;
                return httpErrors.workTypes[409];
            }
        }

        return workType;
    },

    async delete({ set, params }: IWorkTypeGetContext): Promise<IWorkType | { error: string }> {
        const workType = await WorkTypeModel.getById(params.id);
        if (!workType) {
            set.status = 404;
            return httpErrors.workTypes[404];
        }

        const success = await WorkTypeModel.delete(params.id);
        if (!success) {
            set.status = 409;
            return httpErrors.workTypes[409];
        }

        return workType;
    },
};
