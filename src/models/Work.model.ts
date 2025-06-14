import { db } from '../db/connect';
import { works } from '../db/schema';
import { eq } from 'drizzle-orm';
import { IWorkType } from './WorkType.model';
import { IApplication } from './Application.model';
import { IUser } from './User.model';

export type IWork = {
    id: number;
    idApplication: number;
    idUser: number;
    idWorktype: number;
    startDate: number;
    endDate: number | null;
    comments: string | null;
}

export type IWorkWithDependencies = IWork & {
    application: IApplication;
    user: IUser;
    workType: IWorkType;
}

export type CreateWorkDTO = Omit<IWork, 'id'>;
export type UpdateWorkDTO = Partial<CreateWorkDTO>;

export const WorkModel = {
    async create(data: CreateWorkDTO): Promise<IWork> {
        const [work] = await db.insert(works)
            .values(data)
            .returning();
        return work;
    },

    async getById(id: number): Promise<IWorkWithDependencies | undefined> {
        return await db.query.works.findFirst({
            where: eq(works.id, id),
            with: {application: true, user: true, workType: true }
        });
    },

    async getByApplicationId(applicationId: number): Promise<IWorkWithDependencies[]> {
        return await db.query.works.findMany({
            where: eq(works.idApplication, applicationId),
            with: {application: true, user: true, workType: true }
        });
    },

    async getByUserId(userId: number): Promise<IWorkWithDependencies[]> {
        return await db.query.works.findMany({
            where: eq(works.idUser, userId),
            with: {application: true, user: true, workType: true }
        });
    },

    async getByWorkTypeId(workTypeId: number): Promise<IWorkWithDependencies[]> {
        return await db.query.works.findMany({
            where: eq(works.idWorktype, workTypeId),
            with: {application: true, user: true, workType: true }
        });
    },

    async getAll(): Promise<IWorkWithDependencies[]> {
        return await db.query.works.findMany({
            with: {application: true, user: true, workType: true }
        });
    },

    async update(id: number, data: UpdateWorkDTO): Promise<IWork | null> {
        const [work] = await db.update(works)
            .set(data)
            .where(eq(works.id, id))
            .returning();
        return work || null;
    },

    async delete(id: number): Promise<IWork | null> {
        const [deletedWork] = await db.delete(works)
            .where(eq(works.id, id))
            .returning();
        return deletedWork;
    }
} 