import type {
    IWorkCategoryCreateContext,
    IWorkCategoryGetContext,
    IWorkCategoryUpdateContext,
    IWorkCategoryGetByNameContext,
} from './types/WorkCategories.handler';
import { IWorkCategory, WorkCategoryModel } from '../models';
import { httpErrors } from '../services/httpErrors';

export default {
    async list() {
        return await WorkCategoryModel.getAll();
    },

    async getOne({ set, params }: IWorkCategoryGetContext): Promise<IWorkCategory | null> {
        return await WorkCategoryModel.getById(params.id) ?? null;
    },

    async getByName({ set, params }: IWorkCategoryGetByNameContext): Promise<IWorkCategory | null> {
        return await WorkCategoryModel.getByName(params.name) ?? null;
    },

    async create({ set, body }: IWorkCategoryCreateContext): Promise<IWorkCategory | { error: string }> {
        try {
            const newCategory = await WorkCategoryModel.create(body);
            return newCategory;
        } catch (e) {
            set.status = 409;
            return httpErrors.workCategories[409];
        }
    },

    async update({ set, params, body }: IWorkCategoryUpdateContext): Promise<IWorkCategory | { error: string }> {
        const category = await WorkCategoryModel.getById(params.id);

        if (!category) {
            set.status = 404;
            return httpErrors.workCategories[404];
        }

        try {
            const updatedCategory = await WorkCategoryModel.update(params.id, body);
            return updatedCategory!;
        } catch (e) {
            set.status = 409;
            return httpErrors.workCategories[409];
        }
    },

    async delete({ set, params }: IWorkCategoryGetContext) {
        const category = await WorkCategoryModel.getById(params.id);

        if (!category) {
            set.status = 404;
            return httpErrors.workCategories[404];
        }

        const deletedCategory = await WorkCategoryModel.delete(params.id);

        return deletedCategory;
    },
};
