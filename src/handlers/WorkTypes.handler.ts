import type {
    IWorkType,
    IWorkTypeCreateContext,
    IWorkTypeGetContext,
    IWorkTypeUpdateContext,
    IWorkTypeGetByNameContext,
    IWorkTypeGetByCategoryContext,
    IWorkTypeWithCategory,
} from './types/WorkTypes.handler';
import { db } from '../db/connect';
import { workTypes, workCategories } from '../db/schema';
import { eq } from 'drizzle-orm';
import { httpErrors } from '../services/httpErrors';

export default {
    async list(): Promise<IWorkTypeWithCategory[]> {
        return await db.query.workTypes.findMany({
            with: { category: true },
        });
    },

    async getOne({ set, params }: IWorkTypeGetContext): Promise<IWorkType | { error: string }> {
        const workType = await db.query.workTypes.findFirst({
            where: eq(workTypes.id, params.id),
            with: { category: true },
        });

        if (!workType) {
            set.status = 404;
            return httpErrors.workTypes[404];
        }

        return workType;
    },

    async getByName({ set, params }: IWorkTypeGetByNameContext): Promise<IWorkTypeWithCategory | { error: string }> {
        const workType = await db.query.workTypes.findFirst({
            where: eq(workTypes.name, params.name),
            with: { category: true },
        });

        if (!workType) {
            set.status = 404;
            return httpErrors.workTypes[404];
        }

        return workType;
    },

    async getByCategory({
        set,
        params,
    }: IWorkTypeGetByCategoryContext): Promise<IWorkTypeWithCategory[] | { error: string }> {
        const category = await db.query.workCategories.findFirst({
            where: eq(workCategories.id, params.categoryId),
        });

        if (!category) {
            set.status = 404;
            return httpErrors.workCategories[404];
        }

        return await db.query.workTypes.findMany({
            where: eq(workTypes.categoryId, params.categoryId),
            with: { category: true },
        });
    },

    async create({ set, body }: IWorkTypeCreateContext): Promise<IWorkType | { error: string }> {
        if (body.categoryId) {
            const category = await db.query.workCategories.findFirst({
                where: eq(workCategories.id, body.categoryId),
            });
            if (!category) {
                set.status = 400;
                return httpErrors.workCategories[404];
            }
        }

        const [newWorkType] = await db.insert(workTypes).values(body).returning();

        return newWorkType;
    },

    async update({ set, params, body }: IWorkTypeUpdateContext): Promise<IWorkType | { error: string }> {
        const workType = await db.query.workTypes.findFirst({
            where: eq(workTypes.id, params.id),
        });

        if (!workType) {
            set.status = 404;
            return httpErrors.workTypes[404];
        }

        if (body.categoryId) {
            const category = await db.query.workCategories.findFirst({
                where: eq(workCategories.id, body.categoryId),
            });
            if (!category) {
                set.status = 400;
                return httpErrors.workCategories[404];
            }
        }

        if (Object.keys(body).length > 0) {
            const [updatedWorkType] = await db
                .update(workTypes)
                .set(body)
                .where(eq(workTypes.id, params.id))
                .returning();
            return updatedWorkType;
        }

        return workType;
    },

    async delete({ set, params }: IWorkTypeGetContext): Promise<IWorkType | { error: string }> {
        const workType = await db.query.workTypes.findFirst({
            where: eq(workTypes.id, params.id),
        });

        if (!workType) {
            set.status = 404;
            return httpErrors.workTypes[404];
        }

        const [deletedWorkType] = await db.delete(workTypes).where(eq(workTypes.id, params.id)).returning();

        return deletedWorkType;
    },
};
