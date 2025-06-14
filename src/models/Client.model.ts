import { db } from '../db/connect';
import { clients } from '../db/schema';
import { eq } from 'drizzle-orm';

export type IClient = {
    id: number;
    name: string;
    phone: string;
    email: string;
}

export type CreateClientDTO = Omit<IClient, 'id'>;
export type UpdateClientDTO = Partial<CreateClientDTO>;

export const ClientModel = {
    async create(data: CreateClientDTO): Promise<IClient> {
        const [client] = await db.insert(clients)
            .values(data)
            .returning();
        return client;
    },

    async getById(id: number): Promise<IClient | undefined> {
        return await db.query.clients.findFirst({
            where: eq(clients.id, id)
        });
    },

    async getByPhone(phone: string): Promise<IClient | undefined> {
        return await db.query.clients.findFirst({
            where: eq(clients.phone, phone)
        });
    },

    async getByEmail(email: string): Promise<IClient | undefined> {
        return await db.query.clients.findFirst({
            where: eq(clients.email, email)
        });
    },

    async getAll(): Promise<IClient[]> {
        return await db.query.clients.findMany();
    },

    async update(id: number, data: UpdateClientDTO): Promise<IClient | null> {
        const [client] = await db.update(clients)
            .set(data)
            .where(eq(clients.id, id))
            .returning();
        return client || null;
    },

    async delete(id: number): Promise<boolean> {
        const [deletedClient] = await db.delete(clients)
            .where(eq(clients.id, id))
            .returning();
        return !!deletedClient;
    }
}

