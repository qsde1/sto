import type {
    IClient,
    IClientCreateContext,
    IClientGetContext,
    IClientUpdateContext,
    IClientGetByPhoneContext,
    IClientGetByEmailContext,
} from './types/Clients.handler';
import { db } from '../db/connect';
import { clients } from '../db/schema';
import { eq, and, not, or } from 'drizzle-orm';
import { httpErrors } from '../services/httpErrors';

export default {
    async list(): Promise<IClient[]> {
        return await db.query.clients.findMany();
    },

    async getOne({ set, params }: IClientGetContext): Promise<IClient | { error: string }> {
        const client = await db.query.clients.findFirst({
            where: eq(clients.id, params.id),
        });

        if (!client) {
            set.status = 404;
            return httpErrors.clients[404];
        }

        return client;
    },

    async getByPhone({ set, params }: IClientGetByPhoneContext): Promise<IClient | { error: string }> {
        const client = await db.query.clients.findFirst({
            where: eq(clients.phone, params.phone),
        });

        if (!client) {
            set.status = 404;
            return httpErrors.clients[404];
        }

        return client;
    },

    async getByEmail({ set, params }: IClientGetByEmailContext): Promise<IClient | { error: string }> {
        const client = await db.query.clients.findFirst({
            where: eq(clients.email, params.email),
        });

        if (!client) {
            set.status = 404;
            return httpErrors.clients[404];
        }

        return client;
    },

    async create({ set, body }: IClientCreateContext): Promise<IClient | { error: string }> {
        const existingClient = await db.query.clients.findFirst({
            where: or(eq(clients.phone, body.phone), eq(clients.email, body.email)),
        });

        if (existingClient) {
            set.status = 409;
            return httpErrors.clients[409];
        }

        const [newClient] = await db.insert(clients).values(body).returning();

        return newClient;
    },

    async update({ set, params, body }: IClientUpdateContext): Promise<IClient | { error: string }> {
        const client = await db.query.clients.findFirst({
            where: eq(clients.id, params.id),
        });

        if (!client) {
            set.status = 404;
            return httpErrors.clients[404];
        }

        const updateData: Partial<IClient> = {};

        if (body.phone && body.phone !== client.phone) {
            const exist = await db.query.clients.findFirst({
                where: eq(clients.phone, body.phone),
            });

            if (exist) {
                set.status = 409;
                return httpErrors.clients[409];
            }
            updateData.phone = body.phone;
        }

        if (body.email && body.email !== client.email) {
            const exist = await db.query.clients.findFirst({
                where: eq(clients.email, body.email),
            });

            if (exist) {
                set.status = 409;
                return httpErrors.clients[409];
            }
            updateData.email = body.email;
        }

        if (body.name) updateData.name = body.name;

        if (Object.keys(updateData).length > 0) {
            const [updatedClient] = await db
                .update(clients)
                .set(updateData)
                .where(eq(clients.id, params.id))
                .returning();
            return updatedClient;
        }

        return client;
    },

    async delete({ set, params }: IClientGetContext): Promise<IClient | { error: string }> {
        const client = await db.query.clients.findFirst({
            where: eq(clients.id, params.id),
        });

        if (!client) {
            set.status = 404;
            return httpErrors.clients[404];
        }

        const [deletedClient] = await db.delete(clients).where(eq(clients.id, params.id)).returning();

        return deletedClient;
    },
};
