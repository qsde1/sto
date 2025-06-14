import type {
    ISupplierCreateContext,
    ISupplierGetContext,
    ISupplierUpdateContext,
    ISupplierGetByNameContext,
} from './types/Suppliers.handler';
import { SupplierModel, type ISupplier } from '../models';
import { httpErrors } from '../services/httpErrors';

export default {
    async list(): Promise<ISupplier[]> {
        return await SupplierModel.getAll();
    },

    async getOne({ set, params }: ISupplierGetContext): Promise<ISupplier | null> {
        return await SupplierModel.getById(params.id);
    },

    async getByName({ set, params }: ISupplierGetByNameContext): Promise<ISupplier | null> {
        return await SupplierModel.getByName(params.name);
    },

    async create({ set, body }: ISupplierCreateContext): Promise<ISupplier | { error: string }> {
        const existingSupplier = await SupplierModel.getByName(body.name);
        if (existingSupplier) {
            set.status = 409;
            return httpErrors.suppliers[409];
        }

        return await SupplierModel.create(body);
    },

    async update({ set, params, body }: ISupplierUpdateContext): Promise<ISupplier | { error: string }> {
        const supplier = await SupplierModel.getById(params.id);
        if (!supplier) {
            set.status = 404;
            return httpErrors.suppliers[404];
        }

        if (body.name && body.name !== supplier.name) {
            const existingSupplier = await SupplierModel.getByName(body.name);
            if (existingSupplier) {
                set.status = 409;
                return httpErrors.suppliers[409];
            }
        }

        const updatedSupplier = await SupplierModel.update(params.id, body);
        if (!updatedSupplier) {
            set.status = 409;
            return httpErrors.suppliers[409];
        }

        return updatedSupplier;
    },

    async delete({ set, params }: ISupplierGetContext): Promise<ISupplier | { error: string } | null> {
        return await SupplierModel.delete(params.id) ?? null;
    },
};
