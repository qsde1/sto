import type {
    IWorkCategory,
    IWorkCategoryCreateContext,
    IWorkCategoryGetContext,
    IWorkCategoryUpdateContext,
    IWorkCategoryGetByNameContext,
} from './types/WorkCategories.handler';
import { db } from '../db/connect';
import { workCategories } from '../db/schema';
import { eq } from 'drizzle-orm';
import { httpErrors } from '../services/httpErrors';

export default {
    async list(): Promise<IWorkCategory[]> {
        return await db.query.workCategories.findMany();
    },

    async getOne({ set, params }: IWorkCategoryGetContext): Promise<IWorkCategory | { error: string }> {
        const category = await db.query.workCategories.findFirst({
            where: eq(workCategories.id, params.id),
        });

        if (!category) {
            set.status = 404;
            return httpErrors.workCategories[404];
        }

        return category;
    },

    async getByName({ set, params }: IWorkCategoryGetByNameContext): Promise<IWorkCategory | { error: string }> {
        const category = await db.query.workCategories.findFirst({
            where: eq(workCategories.name, params.name),
        });

        if (!category) {
            set.status = 404;
            return httpErrors.workCategories[404];
        }

        return category;
    },

    async create({ set, body }: IWorkCategoryCreateContext): Promise<IWorkCategory | { error: string }> {
        try {
            const [newCategory] = await db.insert(workCategories).values(body).returning();
            return newCategory;
        } catch (e) {
            set.status = 409;
            return httpErrors.workCategories[409];
        }
    },

    async update({ set, params, body }: IWorkCategoryUpdateContext): Promise<IWorkCategory | { error: string }> {
        const category = await db.query.workCategories.findFirst({
            where: eq(workCategories.id, params.id),
        });

        if (!category) {
            set.status = 404;
            return httpErrors.workCategories[404];
        }

        try {
            const [updatedCategory] = await db
                .update(workCategories)
                .set(body)
                .where(eq(workCategories.id, params.id))
                .returning();
            return updatedCategory;
        } catch (e) {
            set.status = 409;
            return httpErrors.workCategories[409];
        }
    },

    async delete({ set, params }: IWorkCategoryGetContext): Promise<IWorkCategory | { error: string }> {
        const category = await db.query.workCategories.findFirst({
            where: eq(workCategories.id, params.id),
        });

        if (!category) {
            set.status = 404;
            return httpErrors.workCategories[404];
        }

        const [deletedCategory] = await db.delete(workCategories).where(eq(workCategories.id, params.id)).returning();

        return deletedCategory;
    },
};
