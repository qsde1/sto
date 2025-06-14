import { db } from '../db/connect';
import { workTypes } from '../db/schema';
import { eq } from 'drizzle-orm';
import { IWorkCategory } from './WorkCategory.model';

export type IWorkType = {
    id: number;
    name: string;
    price: number;
    categoryId: number;
}

export type IWorkTypeWithCategory = IWorkType & {
    category: IWorkCategory;
}

export type CreateWorkTypeDTO = Omit<IWorkType, 'id'>;
export type UpdateWorkTypeDTO = Partial<CreateWorkTypeDTO>;

export const WorkTypeModel = {
    async create(data: CreateWorkTypeDTO): Promise<IWorkType> {
        const [workType] = await db.insert(workTypes)
            .values(data)
            .returning();
        return workType;
    },

    async getById(id: number): Promise<IWorkTypeWithCategory | undefined> {
        return await db.query.workTypes.findFirst({
            where: eq(workTypes.id, id),
            with: {category: true}
        });
    },

    async getByName(name: string): Promise<IWorkTypeWithCategory | undefined> {
        return await db.query.workTypes.findFirst({
            where: eq(workTypes.name, name),
            with: {category: true}
        });
    },

    async getByCategoryId(categoryId: number): Promise<IWorkTypeWithCategory[]> {
        return await db.query.workTypes.findMany({
            where: eq(workTypes.categoryId, categoryId),
            with: {category: true}
        });
    },

    async getAll(): Promise<IWorkTypeWithCategory[]> {
        return await db.query.workTypes.findMany({with: {category: true}});
    },

    async update(id: number, data: UpdateWorkTypeDTO): Promise<IWorkType | null> {
        const [workType] = await db.update(workTypes)
            .set(data)
            .where(eq(workTypes.id, id))
            .returning();
        return workType || null;
    },

    async delete(id: number): Promise<boolean> {
        const [deletedWorkType] = await db.delete(workTypes)
            .where(eq(workTypes.id, id))
            .returning();
        return !!deletedWorkType;
    }
} 