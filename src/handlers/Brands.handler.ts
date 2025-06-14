import type {
    IBrandCreateContext,
    IBrandGetContext,
    IBrandUpdateContext,
    IBrandGetByNameContext,
} from './types/Brands.handler';
import type { IBrand } from '../models';
import { BrandModel } from '../models';

export default {
    async list(): Promise<IBrand[]> {
        return await BrandModel.getAll();
    },

    async getOne({ params }: IBrandGetContext): Promise<IBrand | undefined> {
        return await BrandModel.getById(params.id);
    },

    async getByName({ params }: IBrandGetByNameContext): Promise<IBrand | undefined> {
        return await BrandModel.getByName(params.name);
    },

    async create({ body }: IBrandCreateContext): Promise<IBrand> {
        return await BrandModel.create(body);
    },

    async update({ params, body }: IBrandUpdateContext): Promise<IBrand | null> {
        return await BrandModel.update(params.id, body);
    },

    async delete({ params }: IBrandGetContext): Promise<boolean> {
        return await BrandModel.delete(params.id);
    }
}
