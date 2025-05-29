import type {
    IBrand,
    IBrandCreateContext,
    IBrandGetContext,
    IBrandUpdateContext,
    IBrandGetByNameContext,
} from './types/Brands.handler';
import { db } from '../db/connect';
import { brands } from '../db/schema';
import { eq } from 'drizzle-orm';
import { httpErrors } from '../services/httpErrors';

export default {
    async list(): Promise<IBrand[]> {
        return await db.query.brands.findMany();
    },

    async getOne({ set, params }: IBrandGetContext): Promise<IBrand | { error: string }> {
        const brand = await db.query.brands.findFirst({
            where: eq(brands.id, params.id),
        });

        if (!brand) {
            set.status = 404;
            return httpErrors.brands[404];
        }

        return brand;
    },

    async getByName({ set, params }: IBrandGetByNameContext): Promise<IBrand | { error: string }> {
        const brand = await db.query.brands.findFirst({
            where: eq(brands.name, params.name),
        });

        if (!brand) {
            set.status = 404;
            return httpErrors.brands[404];
        }

        return brand;
    },

    async create({ set, body }: IBrandCreateContext): Promise<IBrand | { error: string }> {
        try {
            const [newBrand] = await db.insert(brands).values(body).returning();
            return newBrand;
        } catch (e) {
            set.status = 409;
            return httpErrors.brands[409];
        }
    },

    async update({ set, params, body }: IBrandUpdateContext): Promise<IBrand | { error: string }> {
        const brand = await db.query.brands.findFirst({
            where: eq(brands.id, params.id),
        });

        if (!brand) {
            set.status = 404;
            return httpErrors.brands[404];
        }

        try {
            const [updatedBrand] = await db.update(brands).set(body).where(eq(brands.id, params.id)).returning();
            return updatedBrand;
        } catch (e) {
            set.status = 409;
            return httpErrors.brands[409];
        }
    },

    async delete({ set, params }: IBrandGetContext): Promise<IBrand | { error: string }> {
        const brand = await db.query.brands.findFirst({
            where: eq(brands.id, params.id),
        });

        if (!brand) {
            set.status = 404;
            return httpErrors.brands[404];
        }

        const [deletedBrand] = await db.delete(brands).where(eq(brands.id, params.id)).returning();

        return deletedBrand;
    },
};
