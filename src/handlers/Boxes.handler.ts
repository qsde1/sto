import type {
    IBox,
    IBoxCreateContext,
    IBoxGetByIdContext,
    IBoxUpdateContext,
    IBoxGetByNumberContext,
} from './types/Boxes.handler';
import { db } from '../db/connect';
import { boxes } from '../db/schema';
import { and, eq, not } from 'drizzle-orm';
import { httpErrors } from '../services/httpErrors';

export default {
    async getOne({ set, params }: IBoxGetByIdContext): Promise<IBox | { error: string }> {
        const box = await db.query.boxes.findFirst({
            where: eq(boxes.id, params.id),
        });

        if (!box) {
            set.status = 404;
            return httpErrors.boxes[404];
        }

        return box;
    },

    async getByNumber({ set, params }: IBoxGetByNumberContext): Promise<IBox | { error: string }> {
        const box = await db.query.boxes.findFirst({
            where: eq(boxes.number, params.number),
        });

        if (!box) {
            set.status = 404;
            return httpErrors.boxes[404];
        }

        return box;
    },

    async list(): Promise<IBox[]> {
        return await db.query.boxes.findMany();
    },

    async create({ set, body }: IBoxCreateContext): Promise<IBox | { error: string }> {
        const existingBox = await db.query.boxes.findFirst({
            where: eq(boxes.number, body.number),
        });

        if (existingBox) {
            set.status = 409;
            return httpErrors.boxes[409];
        }

        const [newBox] = await db.insert(boxes).values(body).returning();

        return newBox;
    },

    async update({ set, body, params }: IBoxUpdateContext): Promise<IBox | { error: string }> {
        const box = await db.query.boxes.findFirst({
            where: eq(boxes.id, params.id),
        });

        if (!box) {
            set.status = 404;
            return httpErrors.boxes[404];
        }

        if (body.number && body.number !== box.number) {
            const exist = await db.query.boxes.findFirst({
                where: and(eq(boxes.number, body.number), not(eq(boxes.id, params.id))),
            });

            if (exist) {
                set.status = 409;
                return httpErrors.boxes[409];
            }
        }

        const [updatedBox] = await db.update(boxes).set(body).where(eq(boxes.id, params.id)).returning();

        return updatedBox;
    },

    async delete({ set, params }: IBoxGetByIdContext): Promise<IBox | { error: string }> {
        const box = await db.query.boxes.findFirst({
            where: eq(boxes.id, params.id),
        });

        if (!box) {
            set.status = 404;
            return httpErrors.boxes[404];
        }

        const [deletedBox] = await db.delete(boxes).where(eq(boxes.id, params.id)).returning();

        return deletedBox;
    },
};
