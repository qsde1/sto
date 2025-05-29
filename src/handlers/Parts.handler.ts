import type {
    IPart,
    IPartCreateContext,
    IPartGetContext,
    IPartUpdateContext,
    IPartGetByNameContext,
    IPartGetBySupplierContext,
    IPartWithSuppliers,
} from './types/Parts.handler';
import { db } from '../db/connect';
import { parts, suppliers } from '../db/schema';
import { eq, and, not } from 'drizzle-orm';
import { httpErrors } from '../services/httpErrors';

export default {
    async list(): Promise<IPartWithSuppliers[]> {
        return await db.query.parts.findMany({
            with: { supplier: true },
        });
    },

    async getOne({ set, params }: IPartGetContext): Promise<IPart | { error: string }> {
        const part = await db.query.parts.findFirst({
            where: eq(parts.id, params.id),
            with: { supplier: true },
        });

        if (!part) {
            set.status = 404;
            return httpErrors.parts[404];
        }

        return part;
    },

    async getByName({ set, params }: IPartGetByNameContext): Promise<IPart | { error: string }> {
        const part = await db.query.parts.findFirst({
            where: eq(parts.name, params.name),
            with: { supplier: true },
        });

        if (!part) {
            set.status = 404;
            return httpErrors.parts[404];
        }

        return part;
    },

    async getBySupplier({ set, params }: IPartGetBySupplierContext): Promise<IPart[] | { error: string }> {
        const supplier = await db.query.suppliers.findFirst({
            where: eq(suppliers.id, params.idSuppliers!),
        });

        if (!supplier) {
            set.status = 404;
            return httpErrors.suppliers[404];
        }

        return await db.query.parts.findMany({
            where: eq(parts.idSuppliers, params.idSuppliers!),
        });
    },

    async create({ set, body }: IPartCreateContext): Promise<IPart | { error: string }> {
        if (body.idSuppliers) {
            const supplier = await db.query.suppliers.findFirst({
                where: eq(suppliers.id, body.idSuppliers),
            });
            if (!supplier) {
                set.status = 404;
                return httpErrors.suppliers[404];
            }
        }

        const [newPart] = await db.insert(parts).values(body).returning();

        return newPart;
    },

    async update({ set, params, body }: IPartUpdateContext): Promise<IPart | { error: string }> {
        const part = await db.query.parts.findFirst({
            where: eq(parts.id, params.id),
        });

        if (!part) {
            set.status = 404;
            return httpErrors.parts[404];
        }

        if (body.idSuppliers) {
            const supplier = await db.query.suppliers.findFirst({
                where: eq(suppliers.id, body.idSuppliers),
            });
            if (!supplier) {
                set.status = 404;
                return httpErrors.suppliers[404];
            }
        }

        if (Object.keys(body).length > 0) {
            const [updatedPart] = await db.update(parts).set(body).where(eq(parts.id, params.id)).returning();
            return updatedPart;
        }

        return part;
    },

    async delete({ set, params }: IPartGetContext): Promise<IPart | { error: string }> {
        const part = await db.query.parts.findFirst({
            where: eq(parts.id, params.id),
        });

        if (!part) {
            set.status = 404;
            return httpErrors.parts[404];
        }

        const [deletedPart] = await db.delete(parts).where(eq(parts.id, params.id)).returning();

        return deletedPart;
    },
};
