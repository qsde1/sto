import { db } from '../db/connect';
import { brands } from '../db/schema';
import { eq } from 'drizzle-orm';

export type IBrand = {
    id: number;
    name: string;
}

export type CreateBrandDTO = Omit<IBrand, 'id'>;
export type UpdateBrandDTO = Partial<CreateBrandDTO>;

export const BrandModel = {
    async create(data: CreateBrandDTO): Promise<IBrand> {
        const [brand] = await db.insert(brands)
            .values(data)
            .returning();
        return brand;
    },

    async getById(id: number): Promise<IBrand | undefined> {
        return await db.query.brands.findFirst({
            where: eq(brands.id, id)
        });
    },

    async getByName(name: string): Promise<IBrand | undefined> {
        return await db.query.brands.findFirst({
            where: eq(brands.name, name)
        });
    },

    async getAll(): Promise<IBrand[]> {
        return await db.query.brands.findMany();
    },

    async update(id: number, data: UpdateBrandDTO): Promise<IBrand | null> {
        const [brand] = await db.update(brands)
            .set(data)
            .where(eq(brands.id, id))
            .returning();
        return brand || null;
    },

    async delete(id: number): Promise<boolean> {
        const [deletedBrand] = await db.delete(brands)
            .where(eq(brands.id, id))
            .returning();
        return !!deletedBrand;
    }
} 