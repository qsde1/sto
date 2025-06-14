import { db } from '../db/connect';
import { brands, models } from '../db/schema';
import { eq } from 'drizzle-orm';

import { BrandModel, type IBrand } from './index'

export type IModel = {
    id: number;
    name: string;
    brandId: number;
}

export type CreateModelDTO = Omit<IModel, 'id'>;
export type UpdateModelDTO = Partial<CreateModelDTO>;

export const ModelModel = {
    async create(data: CreateModelDTO): Promise<IModel> {
        const [model] = await db.insert(models)
            .values(data)
            .returning();
        return model;
    },

    async getById(id: number): Promise<IModel | undefined> {
        return await db.query.models.findFirst({
            where: eq(models.id, id)
        });
    },

    async getByName(name: string): Promise<IModel | undefined> {
        return await db.query.models.findFirst({
            where: eq(models.name, name)
        });
    },

    async getByBrand(brandId: number): Promise<IModel[]> {
        return await db.query.models.findMany({
            where: eq(models.brandId, brandId)
        });
    },

    async getAll(): Promise<IModel[]> {
        return await db.query.models.findMany();
    },

    async update(id: number, data: UpdateModelDTO): Promise<IModel | null> {
        const [model] = await db.update(models)
            .set(data)
            .where(eq(models.id, id))
            .returning();
        return model || null;
    },

    async delete(id: number): Promise<IModel | null> {
        const [deletedModel] = await db.delete(models)
            .where(eq(models.id, id))
            .returning();
        return deletedModel;
    },

    async getOrCreateModelByName(modelName: IModel['name'], brandName: IBrand['name']): Promise<IModel> {
        let modelDB = await db.query.models.findFirst({
            where: eq(models.name, modelName),
        });
    
        if (!modelDB) {
            let brandDB = await BrandModel.getByName(brandName);
            if (!brandDB) {
                brandDB = await BrandModel.create({ name: brandName });
            }
            [modelDB] = await db.insert(models).values({ name: modelName, brandId: brandDB?.id }).returning();
        }
        return modelDB;

    }
} 