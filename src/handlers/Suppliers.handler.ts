import type {
    ISupplier,
    ISupplierCreateContext,
    ISupplierGetContext,
    ISupplierUpdateContext,
    ISupplierGetByNameContext,
} from './types/Suppliers.handler';
import { db } from '../db/connect';
import { suppliers } from '../db/schema';
import { eq, and, not } from 'drizzle-orm';
import { httpErrors } from '../services/httpErrors';

export default {
    async list(): Promise<ISupplier[]> {
        return await db.query.suppliers.findMany();
    },

    async getOne({ set, params }: ISupplierGetContext): Promise<ISupplier | { error: string }> {
        const supplier = await db.query.suppliers.findFirst({
            where: eq(suppliers.id, params.id),
        });

        if (!supplier) {
            set.status = 404;
            return httpErrors.suppliers[404];
        }

        return supplier;
    },

    async getByName({ set, params }: ISupplierGetByNameContext): Promise<ISupplier | { error: string }> {
        const supplier = await db.query.suppliers.findFirst({
            where: eq(suppliers.name, params.name),
        });

        if (!supplier) {
            set.status = 404;
            return httpErrors.suppliers[404];
        }

        return supplier;
    },

    async create({ set, body }: ISupplierCreateContext): Promise<ISupplier | { error: string }> {
        const existingSupplier = await db.query.suppliers.findFirst({
            where: eq(suppliers.name, body.name),
        });

        if (existingSupplier) {
            set.status = 409;
            return httpErrors.suppliers[409];
        }

        const [newSupplier] = await db
            .insert(suppliers)
            .values({
                name: body.name,
                contacts: body.contacts ?? null,
            })
            .returning();

        return newSupplier;
    },

    async update({ set, params, body }: ISupplierUpdateContext): Promise<ISupplier | { error: string }> {
        const supplier = await db.query.suppliers.findFirst({
            where: eq(suppliers.id, params.id),
        });

        if (!supplier) {
            set.status = 404;
            return httpErrors.suppliers[404];
        }

        const updateData: Partial<ISupplier> = {};

        if (body.name && body.name !== supplier.name) {
            const exist = await db.query.suppliers.findFirst({
                where: eq(suppliers.name, body.name),
            });

            if (exist) {
                set.status = 409;
                return httpErrors.suppliers[409];
            }
            updateData.name = body.name;
        }

        if (body.contacts !== undefined) {
            updateData.contacts = body.contacts;
        }

        if (Object.keys(updateData).length > 0) {
            const [updatedSupplier] = await db
                .update(suppliers)
                .set(updateData)
                .where(eq(suppliers.id, params.id))
                .returning();
            return updatedSupplier;
        }

        return supplier;
    },

    async delete({ set, params }: ISupplierGetContext): Promise<ISupplier | { error: string }> {
        const supplier = await db.query.suppliers.findFirst({
            where: eq(suppliers.id, params.id),
        });

        if (!supplier) {
            set.status = 404;
            return httpErrors.suppliers[404];
        }

        const [deletedSupplier] = await db.delete(suppliers).where(eq(suppliers.id, params.id)).returning();

        return deletedSupplier;
    },
};
