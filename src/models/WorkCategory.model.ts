import { db } from '../db/connect';
import { workCategories } from '../db/schema';
import { eq } from 'drizzle-orm';

export type IWorkCategory = {
    id: number;
    name: string;
}

export type CreateWorkCategoryDTO = Omit<IWorkCategory, 'id'>;
export type UpdateWorkCategoryDTO = Partial<CreateWorkCategoryDTO>;

export const WorkCategoryModel = {
    async create(data: CreateWorkCategoryDTO): Promise<IWorkCategory> {
        const [category] = await db.insert(workCategories)
            .values(data)
            .returning();
        return category;
    },

    async getById(id: number): Promise<IWorkCategory | undefined> {
        return await db.query.workCategories.findFirst({
            where: eq(workCategories.id, id)
        });
    },

    async getByName(name: string): Promise<IWorkCategory | undefined> {
        return await db.query.workCategories.findFirst({
            where: eq(workCategories.name, name)
        });
    },

    async getAll(): Promise<IWorkCategory[]> {
        return await db.query.workCategories.findMany();
    },

    async update(id: number, data: UpdateWorkCategoryDTO): Promise<IWorkCategory | null> {
        const [category] = await db.update(workCategories)
            .set(data)
            .where(eq(workCategories.id, id))
            .returning();
        return category || null;
    },

    async delete(id: number): Promise<boolean> {
        const [deletedCategory] = await db.delete(workCategories)
            .where(eq(workCategories.id, id))
            .returning();
        return !!deletedCategory;
    }
} 