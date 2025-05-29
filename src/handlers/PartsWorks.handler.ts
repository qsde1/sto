import type {
    IPartWork,
    IPartWorkCreateContext,
    IPartWorkGetContext,
    IPartWorkUpdateContext,
    IPartWorkGetByWorkContext,
    IPartWorkGetByPartContext,
} from './types/PartsWorks.handler';
import { db } from '../db/connect';
import { partsWorks, works, parts } from '../db/schema';
import { and, eq } from 'drizzle-orm';
import { httpErrors } from '../services/httpErrors';

export default {
    async list(): Promise<IPartWork[]> {
        return await db.query.partsWorks.findMany({
            with: {
                work: true,
                part: true,
            },
        });
    },

    async getOne({ set, params }: IPartWorkGetContext): Promise<IPartWork | { error: string }> {
        const relation = await db.query.partsWorks.findFirst({
            where: and(eq(partsWorks.workId, params.workId), eq(partsWorks.partId, params.partId)),
            with: {
                work: true,
                part: true,
            },
        });

        if (!relation) {
            set.status = 404;
            return httpErrors.partsWorks[404];
        }

        return relation;
    },

    async getByWork({ set, params }: IPartWorkGetByWorkContext): Promise<IPartWork[] | { error: string }> {
        const work = await db.query.works.findFirst({
            where: eq(works.id, params.workId),
        });

        if (!work) {
            set.status = 404;
            return httpErrors.works[404];
        }

        return await db.query.partsWorks.findMany({
            where: eq(partsWorks.workId, params.workId),
            with: { part: true },
        });
    },

    async getByPart({ set, params }: IPartWorkGetByPartContext): Promise<IPartWork[] | { error: string }> {
        const part = await db.query.parts.findFirst({
            where: eq(parts.id, params.partId),
        });

        if (!part) {
            set.status = 404;
            return httpErrors.parts[404];
        }

        return await db.query.partsWorks.findMany({
            where: eq(partsWorks.partId, params.partId),
            with: { work: true },
        });
    },

    async create({ set, body }: IPartWorkCreateContext): Promise<IPartWork | { error: string }> {
        const work = await db.query.works.findFirst({
            where: eq(works.id, body.workId),
        });
        if (!work) {
            set.status = 404;
            return httpErrors.works[404];
        }

        const part = await db.query.parts.findFirst({
            where: eq(parts.id, body.partId),
        });
        if (!part) {
            set.status = 404;
            return httpErrors.parts[404];
        }

        try {
            const [newRelation] = await db.insert(partsWorks).values(body).returning();
            return newRelation;
        } catch (e) {
            set.status = 409;
            return httpErrors.partsWorks[409];
        }
    },

    async update({ set, params, body }: IPartWorkUpdateContext): Promise<IPartWork | { error: string }> {
        const relation = await db.query.partsWorks.findFirst({
            where: and(eq(partsWorks.workId, params.workId), eq(partsWorks.partId, params.partId)),
        });

        if (!relation) {
            set.status = 404;
            return httpErrors.partsWorks[404];
        }

        if (body.quantity !== undefined) {
            const [updatedRelation] = await db
                .update(partsWorks)
                .set(body)
                .where(and(eq(partsWorks.workId, params.workId), eq(partsWorks.partId, params.partId)))
                .returning();
            return updatedRelation;
        }

        return relation;
    },

    async delete({ set, params }: IPartWorkGetContext): Promise<IPartWork | { error: string }> {
        const relation = await db.query.partsWorks.findFirst({
            where: and(eq(partsWorks.workId, params.workId), eq(partsWorks.partId, params.partId)),
        });

        if (!relation) {
            set.status = 404;
            return httpErrors.partsWorks[404];
        }

        const [deletedRelation] = await db
            .delete(partsWorks)
            .where(and(eq(partsWorks.workId, params.workId), eq(partsWorks.partId, params.partId)))
            .returning();

        return deletedRelation;
    },
};
