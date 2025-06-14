import { db } from '../db/connect';
import { partsWorks, works, parts } from '../db/schema';
import { and, eq } from 'drizzle-orm';
import type { IPart } from './Part.model';
import type { IWork } from './Work.model';

export type IPartsWork = {
    workId: number;
    partId: number;
    quantity: number;
};

export type IPartsWorkWithRelations = IPartsWork & {
    part: IPart;
    work: IWork;
};

export type CreatePartsWorkDTO = IPartsWork;
export type UpdatePartsWorkDTO = Partial<CreatePartsWorkDTO>;

export class PartsWorkModel {
    static async list(): Promise<IPartsWorkWithRelations[]> {
        return await db.query.partsWorks.findMany({
            with: {
                part: true,
                work: true,
            },
        });
    }

    static async create(data: CreatePartsWorkDTO): Promise<IPartsWork> {
        const [newPartsWork] = await db.insert(partsWorks).values(data).returning();
        return newPartsWork;
    }

    static async update(workId: number, partId: number, data: UpdatePartsWorkDTO): Promise<IPartsWork | null> {
        const [updatedPartsWork] = await db
            .update(partsWorks)
            .set(data)
            .where(and(eq(partsWorks.workId, workId), eq(partsWorks.partId, partId)))
            .returning();
        return updatedPartsWork ?? null;
    }

    static async delete(workId: number, partId: number): Promise<IPartsWork | null> {
        const [deletedPartsWork] = await db
            .delete(partsWorks)
            .where(and(eq(partsWorks.workId, workId), eq(partsWorks.partId, partId)))
            .returning();
        return deletedPartsWork ?? null;
    }

    static async getByWorkId(workId: number): Promise<IPartsWorkWithRelations[]> {
        return await db.query.partsWorks.findMany({
            where: eq(partsWorks.workId, workId),
            with: {
                part: true,
                work: true,
            },
        });
    }

    static async getByPartId(partId: number): Promise<IPartsWorkWithRelations[]> {
        return await db.query.partsWorks.findMany({
            where: eq(partsWorks.partId, partId),
            with: {
                part: true,
                work: true,
            },
        });
    }

    static async getById(workId: number, partId: number): Promise<IPartsWorkWithRelations | undefined> {
        return await db.query.partsWorks.findFirst({
            where: and(eq(partsWorks.workId, workId), eq(partsWorks.partId, partId)),
            with: {
                part: true,
                work: true,
            },
        });
    }
} 