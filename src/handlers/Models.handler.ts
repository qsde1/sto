import type {
    IModel,
    IModelCreateContext,
    IModelGetContext,
    IModelUpdateContext,
    IModelGetByNameContext,
    IModelGetByBrandContext,
} from './types/Models.handler';
import { db } from '../db/connect';
import { models, brands } from '../db/schema';
import { and, eq, not } from 'drizzle-orm';
import { httpErrors } from '../services/httpErrors';

export default {
    async list(): Promise<IModel[]> {
        return await db.query.models.findMany({
            with: { brand: true },
        });
    },

    async getOne({ set, params }: IModelGetContext): Promise<IModel | { error: string }> {
        const model = await db.query.models.findFirst({
            where: eq(models.id, params.id),
            with: { brand: true },
        });

        if (!model) {
            set.status = 404;
            return httpErrors.models[404];
        }

        return model;
    },

    async getByName({ set, params }: IModelGetByNameContext): Promise<IModel | { error: string }> {
        const model = await db.query.models.findFirst({
            where: eq(models.name, params.name),
            with: { brand: true },
        });

        if (!model) {
            set.status = 404;
            return httpErrors.models[404];
        }

        return model;
    },

    async getByBrand({ set, params }: IModelGetByBrandContext): Promise<IModel[] | { error: string }> {
        const brand = await db.query.brands.findFirst({
            where: eq(brands.id, params.brandId),
        });

        if (!brand) {
            set.status = 404;
            return httpErrors.brands[404];
        }

        return await db.query.models.findMany({
            where: eq(models.brandId, params.brandId),
        });
    },

    async create({ set, body }: IModelCreateContext): Promise<IModel | { error: string }> {
        const brand = await db.query.brands.findFirst({
            where: eq(brands.id, body.brandId),
        });
        if (!brand) {
            set.status = 404;
            return httpErrors.brands[404];
        }

        const existingModel = await db.query.models.findFirst({
            where: eq(models.name, body.name),
        });
        if (existingModel) {
            set.status = 409;
            return httpErrors.models[409];
        }

        const [newModel] = await db.insert(models).values(body).returning();

        return newModel;
    },

    async update({ set, params, body }: IModelUpdateContext): Promise<IModel | { error: string }> {
        const model = await db.query.models.findFirst({
            where: eq(models.id, params.id),
        });

        if (!model) {
            set.status = 404;
            return httpErrors.models[404];
        }

        if (body.name && body.name !== model.name) {
            const exist = await db.query.models.findFirst({
                where: eq(models.name, body.name),
            });
            if (exist) {
                set.status = 409;
                return httpErrors.models[409];
            }
        }

        if (body.brandId && body.brandId !== model.brandId) {
            const brand = await db.query.brands.findFirst({
                where: eq(brands.id, body.brandId),
            });
            if (!brand) {
                set.status = 404;
                return httpErrors.brands[404];
            }
        }

        if (Object.keys(body).length > 0) {
            const [updatedModel] = await db.update(models).set(body).where(eq(models.id, params.id)).returning();
            return updatedModel;
        }

        return model;
    },

    async delete({ set, params }: IModelGetContext): Promise<IModel | { error: string }> {
        const model = await db.query.models.findFirst({
            where: eq(models.id, params.id),
        });

        if (!model) {
            set.status = 404;
            return httpErrors.models[404];
        }

        const [deletedModel] = await db.delete(models).where(eq(models.id, params.id)).returning();

        return deletedModel;
    },
};
