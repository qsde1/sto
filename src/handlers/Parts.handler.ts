import type {
    IPartCreateContext,
    IPartGetContext,
    IPartUpdateContext,
    IPartGetByNameContext,
    IPartGetBySupplierContext,
} from './types/Parts.handler';
import { IPart, PartModel, type IPartWithSupplier } from '../models/index';
import { httpErrors } from '../services/httpErrors';

export default {
    async list(): Promise<IPartWithSupplier[]> {
        return await PartModel.getAll();
    },

    async getOne({ set, params }: IPartGetContext): Promise<IPartWithSupplier | null> {
        return await PartModel.getById(params.id);
    },

    async getByName({ set, params }: IPartGetByNameContext): Promise<IPartWithSupplier | null> {
        return await PartModel.getByName(params.name);
    },

    async getBySupplier({ set, params }: IPartGetBySupplierContext): Promise<IPartWithSupplier[] | null> {
        return await PartModel.getBySupplierId(params.idSuppliers!) ?? null;
    },

    async create({ set, body }: IPartCreateContext): Promise<IPartWithSupplier | { error: string } | null> {
        if (body.idSuppliers) {
            const supplier = await PartModel.getBySupplierId(body.idSuppliers);
            if (!supplier) {
                set.status = 404;
                return httpErrors.suppliers[404];
            }
        }

        const newPart = await PartModel.create(body);
        return await PartModel.getById(newPart.id);
    },

    async update({ set, params, body }: IPartUpdateContext): Promise<IPartWithSupplier | { error: string } | null> {
        const part = await PartModel.getById(params.id);
        if (!part) {
            set.status = 404;
            return httpErrors.parts[404];
        }

        if (body.idSuppliers) {
            const supplier = await PartModel.getBySupplierId(body.idSuppliers);
            if (!supplier) {
                set.status = 404;
                return httpErrors.suppliers[404];
            }
        }

        const updatedPart = await PartModel.update(params.id, body);
        if (!updatedPart) {
            set.status = 409;
            return httpErrors.parts[409];
        }

        return await PartModel.getById(params.id);
    },

    async delete({ set, params }: IPartGetContext): Promise<IPart | { error: string } | null> {
        return await PartModel.delete(params.id);
    },
};
