import { db } from '../db/connect';
import { boxes } from '../db/schema';
import { eq } from 'drizzle-orm';

export type IBox = {
    id: number;
    number: string;
    occupied: boolean;
};

export type CreateBoxDTO = Omit<IBox, 'id'>;
export type UpdateBoxDTO = Partial<CreateBoxDTO>;

export const BoxModel = {
    async create(data: CreateBoxDTO): Promise<IBox> {
        const [box] = await db.insert(boxes)
            .values(data)
            .returning();
        return box;
    },

    async getById(id: number): Promise<IBox | undefined> {
        return await db.query.boxes.findFirst({
            where: eq(boxes.id, id)
        });
    },

    async getByNumber(number: string): Promise<IBox | undefined> {
        return await db.query.boxes.findFirst({
            where: eq(boxes.number, number)
        });
    },

    async getAll(): Promise<IBox[]> {
        return await db.query.boxes.findMany();
    },

    async update(id: number, data: UpdateBoxDTO): Promise<IBox | null> {
        const [box] = await db.update(boxes)
            .set(data)
            .where(eq(boxes.id, id))
            .returning();
        return box || null;
    },

    async delete(id: number): Promise<boolean> {
        const [deletedBox] = await db.delete(boxes)
            .where(eq(boxes.id, id))
            .returning();
        return !!deletedBox;
    }
}