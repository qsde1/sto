import { db } from '../db/connect';
import { clientsCars } from '../db/schema';
import { and, eq } from 'drizzle-orm';

export type IClientCar = {
    carId: number;
    clientId: number;
    createdAt: number;
    archivedAt: number | null;
}

export type CreateClientCarDTO = Omit<IClientCar, 'createdAt' | 'archivedAt'>;
export type UpdateClientCarDTO = Partial<Pick<IClientCar, 'archivedAt'>>;

export const ClientCarModel = {
    async create(data: CreateClientCarDTO): Promise<IClientCar> {
        const [clientCar] = await db.insert(clientsCars)
            .values({
                ...data,
                createdAt: Date.now()
            })
            .returning();
        return clientCar;
    },

    async getByClientAndCar(clientId: number, carId: number): Promise<IClientCar | undefined> {
        return await db.query.clientsCars.findFirst({
            where: and(
                eq(clientsCars.clientId, clientId),
                eq(clientsCars.carId, carId)
            )
        });
    },

    async getByClient(clientId: number): Promise<IClientCar[]> {
        return await db.query.clientsCars.findMany({
            where: eq(clientsCars.clientId, clientId)
        });
    },

    async getByCar(carId: number): Promise<IClientCar[]> {
        return await db.query.clientsCars.findMany({
            where: eq(clientsCars.carId, carId)
        });
    },

    async getAll(): Promise<IClientCar[]> {
        return await db.query.clientsCars.findMany();
    },

    async update(clientId: number, carId: number, data: UpdateClientCarDTO): Promise<IClientCar | null> {
        const [clientCar] = await db.update(clientsCars)
            .set(data)
            .where(and(
                eq(clientsCars.clientId, clientId),
                eq(clientsCars.carId, carId)
            ))
            .returning();
        return clientCar || null;
    },

    async archive(clientId: number, carId: number): Promise<IClientCar | null> {
        const [clientCar] = await db.update(clientsCars)
            .set({ archivedAt: Date.now() })
            .where(and(
                eq(clientsCars.clientId, clientId),
                eq(clientsCars.carId, carId)
            ))
            .returning();
        return clientCar || null;
    },

    async delete(clientId: number, carId: number): Promise<IClientCar | null> {
        const [deletedClientCar] = await db.delete(clientsCars)
            .where(and(
                eq(clientsCars.clientId, clientId),
                eq(clientsCars.carId, carId)
            ))
            .returning();
        return deletedClientCar || null;
    }
} 