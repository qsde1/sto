import type {
    IModelCreateContext,
    IModelGetContext,
    IModelUpdateContext,
    IModelGetByNameContext,
    IModelGetByBrandContext,
} from './types/Models.handler';
import type { IModel } from '../models';
import { ModelModel } from '../models';

export default {
    async list(): Promise<IModel[]> {
        return await ModelModel.getAll();
    },

    async getOne({ params }: IModelGetContext): Promise<IModel | undefined> {
        return await ModelModel.getById(params.id);
    },

    async getByName({ params }: IModelGetByNameContext): Promise<IModel | undefined> {
        return await ModelModel.getByName(params.name);
    },

    async getByBrand({ params }: IModelGetByBrandContext): Promise<IModel[]> {
        return await ModelModel.getByBrand(params.brandId);
    },

    async create({ body }: IModelCreateContext): Promise<IModel> {
        return await ModelModel.create(body);
    },

    async update({ params, body }: IModelUpdateContext): Promise<IModel | null> {
        return await ModelModel.update(params.id, body);
    },

    async delete({ params }: IModelGetContext): Promise<IModel | null> {
        return await ModelModel.delete(params.id);
    }
}
