import { eq } from 'drizzle-orm';
import { db } from '../db/connect';
import { cars } from '../db/schema';

export type ICar = {
    id: number;
    number: string;
    year: string;
    volumeEngine: number;
    vin: string;
    color: string;
    type: string;
    modelId: number;
};

export type CreateCarDTO = Omit<ICar, 'id' | 'volumeEngine' | 'type' | 'year' | 'modelId'>;
export type UpdateCarDTO = Partial<CreateCarDTO>;

export const CarModel = {
    async create(carData: CreateCarDTO): Promise<ICar> {
        const [newCar] = await db.insert(cars).values(carData).returning();
        return newCar;
    },

    async getById(id: number): Promise<ICar | null> {
        const car = await db.query.cars.findFirst({
            where: eq(cars.id, id)
        });
        return car || null;
    },

    async getByVin(vin: string): Promise<ICar | null> {
        const car = await db.query.cars.findFirst({
            where: eq(cars.vin, vin)
        });
        return car || null;
    },

    async getAll(): Promise<ICar[]> {
        return await db.query.cars.findMany();
    },

    async getByModelId(modelId: number): Promise<ICar[]> {
        return await db.query.cars.findMany({
            where: eq(cars.modelId, modelId)
        });
    },

    async getByNumber(number: string): Promise<ICar | null>{
        return await db.query.cars.findFirst({where: eq(cars.number, number)}) || null;

    },

    async update(id: number, carData: UpdateCarDTO): Promise<ICar | null> {
        const [updatedCar] = await db
            .update(cars)
            .set(carData)
            .where(eq(cars.id, id))
            .returning();
        return updatedCar || null;
    },

    async delete(id: number): Promise<ICar | null> {
        const [deletedCar] = await db
            .delete(cars)
            .where(eq(cars.id, id))
            .returning();
        return deletedCar || null;
    }
};

 