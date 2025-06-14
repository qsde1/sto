import { db } from '../db/connect';
import { worktypeParts, workTypes, parts } from '../db/schema';
import { and, eq } from 'drizzle-orm';
import type { IPart } from './Part.model';
import type { IWorkType } from './WorkType.model';

export type IWorkTypePart = {
    worktypeId: number;
    partId: number;
    quantity: number;
};

export type IWorkTypePartWithRelations = IWorkTypePart & {
    part: IPart;
    workType: IWorkType;
};

export type CreateWorkTypePartDTO = Omit<IWorkTypePart, 'id'>;
export type UpdateWorkTypePartDTO = Partial<CreateWorkTypePartDTO>;

export class WorkTypePartModel {
    static async list(): Promise<IWorkTypePartWithRelations[]> {
        return await db.query.worktypeParts.findMany({
            with: {
                part: true,
                workType: true,
            },
        });
    }

    static async create(data: CreateWorkTypePartDTO): Promise<IWorkTypePart> {
        const [newWorkTypePart] = await db.insert(worktypeParts).values(data).returning();
        return newWorkTypePart;
    }

    static async update(worktypeId: number, partId: number, data: UpdateWorkTypePartDTO): Promise<IWorkTypePart | null> {
        const [updatedWorkTypePart] = await db
            .update(worktypeParts)
            .set(data)
            .where(and(eq(worktypeParts.worktypeId, worktypeId), eq(worktypeParts.partId, partId)))
            .returning();
        return updatedWorkTypePart ?? null;
    }

    static async delete(worktypeId: number, partId: number): Promise<IWorkTypePart | null> {
        const [deletedWorkTypePart] = await db
            .delete(worktypeParts)
            .where(and(eq(worktypeParts.worktypeId, worktypeId), eq(worktypeParts.partId, partId)))
            .returning();
        return deletedWorkTypePart ?? null;
    }

    static async getByWorktypeId(worktypeId: number): Promise<IWorkTypePartWithRelations[]> {
        return await db.query.worktypeParts.findMany({
            where: eq(worktypeParts.worktypeId, worktypeId),
            with: {
                part: true,
                workType: true,
            },
        });
    }

    static async getByPartId(partId: number): Promise<IWorkTypePartWithRelations[]> {
        return await db.query.worktypeParts.findMany({
            where: eq(worktypeParts.partId, partId),
            with: {
                part: true,
                workType: true,
            },
        });
    }

    static async getById(worktypeId: number, partId: number): Promise<IWorkTypePartWithRelations | null> {
        return await db.query.worktypeParts.findFirst({
            where: and(eq(worktypeParts.worktypeId, worktypeId), eq(worktypeParts.partId, partId)),
            with: {
                part: true,
                workType: true,
            },
        }) ?? null;
    }    
} 