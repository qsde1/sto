import type {
    IWorktypePart,
    IWorktypePartCreateContext,
    IWorktypePartGetContext,
    IWorktypePartUpdateContext,
    IWorktypePartGetByWorktypeContext,
    IWorktypePartGetByPartContext,
    IWorktypePartWithPartAndWorkType,
} from './types/WorkTypePart.handler';
import { db } from '../db/connect';
import { worktypeParts, workTypes, parts } from '../db/schema';
import { and, eq } from 'drizzle-orm';
import { httpErrors } from '../services/httpErrors';

export default {
    async list(): Promise<IWorktypePartWithPartAndWorkType[]> {
        return await db.query.worktypeParts.findMany({
            with: {
                workType: true,
                part: true,
            },
        });
    },

    async getOne({
        set,
        params,
    }: IWorktypePartGetContext): Promise<IWorktypePartWithPartAndWorkType | { error: string }> {
        const relation = await db.query.worktypeParts.findFirst({
            where: and(eq(worktypeParts.worktypeId, params.worktypeId), eq(worktypeParts.partId, params.partId)),
            with: {
                workType: true,
                part: true,
            },
        });

        if (!relation) {
            set.status = 404;
            return httpErrors.worktypeParts[404];
        }

        return relation;
    },

    async getByWorktype({
        set,
        params,
    }: IWorktypePartGetByWorktypeContext): Promise<IWorktypePart[] | { error: string }> {
        const workType = await db.query.workTypes.findFirst({
            where: eq(workTypes.id, params.worktypeId),
        });

        if (!workType) {
            set.status = 404;
            return httpErrors.workTypes[404];
        }

        return await db.query.worktypeParts.findMany({
            where: eq(worktypeParts.worktypeId, params.worktypeId),
            with: { part: true },
        });
    },

    async getByPart({ set, params }: IWorktypePartGetByPartContext): Promise<IWorktypePart[] | { error: string }> {
        const part = await db.query.parts.findFirst({
            where: eq(parts.id, params.partId),
        });

        if (!part) {
            set.status = 404;
            return httpErrors.parts[404];
        }

        return await db.query.worktypeParts.findMany({
            where: eq(worktypeParts.partId, params.partId),
            with: { workType: true },
        });
    },

    async create({ set, body }: IWorktypePartCreateContext): Promise<IWorktypePart | { error: string }> {
        const workType = await db.query.workTypes.findFirst({
            where: eq(workTypes.id, body.worktypeId),
        });
        if (!workType) {
            set.status = 404;
            return httpErrors.workTypes[404];
        }

        const part = await db.query.parts.findFirst({
            where: eq(parts.id, body.partId),
        });
        if (!part) {
            set.status = 404;
            return httpErrors.parts[404];
        }

        try {
            const [newRelation] = await db.insert(worktypeParts).values(body).returning();
            return newRelation;
        } catch (e) {
            set.status = 409;
            return httpErrors.worktypeParts[409];
        }
    },

    async update({ set, params, body }: IWorktypePartUpdateContext): Promise<IWorktypePart | { error: string }> {
        const relation = await db.query.worktypeParts.findFirst({
            where: and(eq(worktypeParts.worktypeId, params.worktypeId), eq(worktypeParts.partId, params.partId)),
        });

        if (!relation) {
            set.status = 404;
            return httpErrors.worktypeParts[404];
        }

        if (body.quantity !== undefined) {
            const [updatedRelation] = await db
                .update(worktypeParts)
                .set({ quantity: body.quantity })
                .where(and(eq(worktypeParts.worktypeId, params.worktypeId), eq(worktypeParts.partId, params.partId)))
                .returning();
            return updatedRelation;
        }

        return relation;
    },

    async delete({ set, params }: IWorktypePartGetContext): Promise<IWorktypePart | { error: string }> {
        const relation = await db.query.worktypeParts.findFirst({
            where: and(eq(worktypeParts.worktypeId, params.worktypeId), eq(worktypeParts.partId, params.partId)),
        });

        if (!relation) {
            set.status = 404;
            return httpErrors.worktypeParts[404];
        }

        const [deletedRelation] = await db
            .delete(worktypeParts)
            .where(and(eq(worktypeParts.worktypeId, params.worktypeId), eq(worktypeParts.partId, params.partId)))
            .returning();

        return deletedRelation;
    },
};
