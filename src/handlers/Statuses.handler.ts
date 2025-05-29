import type { IStatus, IStatusCreateContext, IStatusGetContext, IStatusUpdateContext } from './types/Statuses.handler';
import { db } from '../db/connect';
import { statuses } from '../db/schema';
import { eq } from 'drizzle-orm';
import { httpErrors } from '../services/httpErrors';

export default {
    async getOne({ set, params }: IStatusGetContext): Promise<IStatus | { error: string }> {
        const status = await db.query.statuses.findFirst({
            where: eq(statuses.id, params.id),
        });

        if (!status) {
            set.status = 404;
            return httpErrors.statuses[404];
        }

        return status;
    },

    async list(): Promise<IStatus[]> {
        return await db.query.statuses.findMany();
    },

    async create({ set, body }: IStatusCreateContext): Promise<IStatus | { error: string }> {
        const existingStatus = await db.query.statuses.findFirst({
            where: eq(statuses.name, body.name),
        });

        if (existingStatus) {
            set.status = 409;
            return httpErrors.statuses[409];
        }

        const [newStatus] = await db.insert(statuses).values(body).returning();

        return newStatus;
    },

    async update({ set, body, params }: IStatusUpdateContext): Promise<IStatus | { error: string }> {
        const status = await db.query.statuses.findFirst({
            where: eq(statuses.id, params.id),
        });

        if (!status) {
            set.status = 404;
            return httpErrors.statuses[404];
        }

        if (body.name && body.name !== status.name) {
            const exist = await db.query.statuses.findFirst({
                where: eq(statuses.name, body.name),
            });

            if (exist) {
                set.status = 409;
                return httpErrors.statuses[409];
            }
        }

        const [updatedStatus] = await db.update(statuses).set(body).where(eq(statuses.id, params.id)).returning();

        return updatedStatus;
    },

    async delete({ set, params }: IStatusGetContext): Promise<IStatus | { error: string }> {
        const status = await db.query.statuses.findFirst({
            where: eq(statuses.id, params.id),
        });

        if (!status) {
            set.status = 404;
            return httpErrors.statuses[404];
        }

        const [deletedStatus] = await db.delete(statuses).where(eq(statuses.id, params.id)).returning();

        return deletedStatus;
    },
};
