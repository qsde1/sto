import type {
    IClientCar,
    IClientCarCreateContext,
    IClientCarGetContext,
    IClientCarUpdateContext,
    IClientCarGetByClientContext,
    IClientCarGetByCarContext,
    IClientCarWithClientAndCar,
} from './types/ClientsCars.handler';
import { db } from '../db/connect';
import { clientsCars, clients, cars } from '../db/schema';
import { and, eq, isNull } from 'drizzle-orm';
import { httpErrors } from '../services/httpErrors';

export default {
    async list(): Promise<IClientCarWithClientAndCar[]> {
        return await db.query.clientsCars.findMany({
            with: {
                client: true,
                car: true,
            },
        });
    },

    async getOne({ set, params }: IClientCarGetContext): Promise<IClientCar | { error: string }> {
        const relation = await db.query.clientsCars.findFirst({
            where: and(eq(clientsCars.clientId, params.clientId), eq(clientsCars.carId, params.carId)),
            with: {
                client: true,
                car: true,
            },
        });

        if (!relation) {
            set.status = 404;
            return httpErrors.clientsCars[404];
        }

        return relation;
    },

    async getByClient({ set, params }: IClientCarGetByClientContext): Promise<IClientCar[] | { error: string }> {
        const client = await db.query.clients.findFirst({
            where: eq(clients.id, params.clientId),
        });

        if (!client) {
            set.status = 404;
            return httpErrors.clients[404];
        }

        return await db.query.clientsCars.findMany({
            where: and(eq(clientsCars.clientId, params.clientId), isNull(clientsCars.archivedAt)),
            with: { car: true },
        });
    },

    async getByCar({ set, params }: IClientCarGetByCarContext): Promise<IClientCar[] | { error: string }> {
        const car = await db.query.cars.findFirst({
            where: eq(cars.id, params.carId),
        });

        if (!car) {
            set.status = 404;
            return httpErrors.cars[404];
        }

        return await db.query.clientsCars.findMany({
            where: and(eq(clientsCars.carId, params.carId), isNull(clientsCars.archivedAt)),
            with: { client: true },
        });
    },

    async create({ set, body }: IClientCarCreateContext): Promise<IClientCar | { error: string }> {
        const client = await db.query.clients.findFirst({
            where: eq(clients.id, body.clientId),
        });
        if (!client) {
            set.status = 404;
            return httpErrors.clients[404];
        }

        const car = await db.query.cars.findFirst({
            where: eq(cars.id, body.carId),
        });
        if (!car) {
            set.status = 404;
            return httpErrors.cars[404];
        }

        try {
            const [newRelation] = await db.insert(clientsCars).values(body).returning();
            return newRelation;
        } catch (e) {
            set.status = 409;
            return httpErrors.clientsCars[409];
        }
    },

    async update({ set, params, body }: IClientCarUpdateContext): Promise<IClientCar | { error: string }> {
        const relation = await db.query.clientsCars.findFirst({
            where: and(eq(clientsCars.clientId, params.clientId), eq(clientsCars.carId, params.carId)),
        });

        if (!relation) {
            set.status = 404;
            return httpErrors.clientsCars[404];
        }

        const updateData: Partial<IClientCar> = {};
        if (body.archivedAt !== undefined) {
            updateData.archivedAt = body.archivedAt ? new Date(body.archivedAt) : null;
        }

        if (Object.keys(updateData).length > 0) {
            const [updatedRelation] = await db
                .update(clientsCars)
                .set(updateData)
                .where(and(eq(clientsCars.clientId, params.clientId), eq(clientsCars.carId, params.carId)))
                .returning();
            return updatedRelation;
        }

        return relation;
    },

    async delete({ set, params }: IClientCarGetContext): Promise<IClientCar | { error: string }> {
        const relation = await db.query.clientsCars.findFirst({
            where: and(eq(clientsCars.clientId, params.clientId), eq(clientsCars.carId, params.carId)),
        });

        if (!relation) {
            set.status = 404;
            return httpErrors.clientsCars[404];
        }

        const [deletedRelation] = await db
            .delete(clientsCars)
            .where(and(eq(clientsCars.clientId, params.clientId), eq(clientsCars.carId, params.carId)))
            .returning();

        return deletedRelation;
    },
};
