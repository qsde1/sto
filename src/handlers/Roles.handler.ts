import type { IRole, IRoleCreateContext, IRoleGetContext, IRoleUpdateContext } from './types/Roles.handler';
import { db } from '../db/connect';
import { roles } from '../db/schema';
import { and, eq, not } from 'drizzle-orm';
import { httpErrors } from '../services/httpErrors';

export default {
    async getOne({ set, params }: IRoleGetContext): Promise<IRole | { error: string }> {
        const role = await db.query.roles.findFirst({
            where: eq(roles.id, params.id),
        });

        if (!role) {
            set.status = 404;
            return httpErrors.roles[404];
        }

        return role;
    },

    async list(): Promise<IRole[]> {
        return await db.query.roles.findMany();
    },

    async create({ set, body }: IRoleCreateContext): Promise<IRole | { error: string }> {
        const existingRole = await db.query.roles.findFirst({
            where: eq(roles.name, body.name),
        });

        if (existingRole) {
            set.status = 409;
            return httpErrors.roles[409];
        }

        const [newRole] = await db.insert(roles).values(body).returning();

        return newRole;
    },

    async update({ set, body, params }: IRoleUpdateContext): Promise<IRole | { error: string }> {
        const role = await db.query.roles.findFirst({
            where: eq(roles.id, params.id),
        });

        if (!role) {
            set.status = 404;
            return httpErrors.roles[404];
        }

        if (body.name && body.name !== role.name) {
            const exist = await db.query.roles.findFirst({
                where: and(eq(roles.name, body.name), not(eq(roles.id, params.id))),
            });

            if (exist) {
                set.status = 409;
                return httpErrors.roles[409];
            }
        }

        const [updatedRole] = await db.update(roles).set(body).where(eq(roles.id, params.id)).returning();

        return updatedRole;
    },

    async delete({ set, params }: IRoleGetContext): Promise<IRole | { error: string }> {
        const role = await db.query.roles.findFirst({
            where: eq(roles.id, params.id),
        });

        if (!role) {
            set.status = 404;
            return httpErrors.roles[404];
        }

        const [deletedRole] = await db.delete(roles).where(eq(roles.id, params.id)).returning();

        return deletedRole;
    },
};
