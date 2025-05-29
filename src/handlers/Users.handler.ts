import type {
    IUser,
    IUserCreateContext,
    IUserGetContext,
    IUserUpdateContext,
    IUserGetByLoginContext,
    IUserGetByPhoneContext,
    IUserGetByEmailContext,
} from './types/Users.handler';
import { db } from '../db/connect';
import { roles, users } from '../db/schema';
import { and, eq, not, or } from 'drizzle-orm';
import { httpErrors } from '../services/httpErrors';
import { hashPassword, comparePassword } from '../services/bcrypt'; // Предполагается существование сервиса
import { password } from 'bun';
import { IRole } from './types/Roles.handler';

export default {
    async getOne({ set, params }: IUserGetContext): Promise<IUser | { error: string }> {
        const user = await db.query.users.findFirst({
            where: eq(users.id, params.id),
        });

        if (!user) {
            set.status = 404;
            return httpErrors.users[404];
        }

        return user;
    },
    async getOneByLogin({ set, params }: IUserGetByLoginContext): Promise<IUser | { error: string }> {
        const user = await db.query.users.findFirst({
            where: eq(users.login, params.login),
        });

        if (!user) {
            set.status = 404;
            return httpErrors.users[404];
        }

        return user;
    },

    async list(): Promise<IUser[]> {
        return await db.query.users.findMany();
    },

    async create({ set, body }: IUserCreateContext): Promise<IUser | { error: string }> {
        const existingUser = await db.query.users.findFirst({
            where: or(eq(users.login, body.login), eq(users.email, body.email), eq(users.phone, body.phone)),
        });

        if (existingUser) {
            set.status = 409;
            return httpErrors.users[409];
        }

        const hashedPassword = await hashPassword(body.password);

        if (!(await checkIsRoleExist(body.roleId))) {
            set.status = 404;
            return httpErrors.roles[404];
        }
        const newUser = (
            await db
                .insert(users)
                .values({
                    ...body,
                    password: hashedPassword,
                })
                .returning()
        )[0];

        return newUser;
    },

    async update({ set, body, params }: IUserUpdateContext): Promise<IUser | { error: string }> {
        const user = await db.query.users.findFirst({
            where: eq(users.id, params.id),
        });

        if (!user) {
            set.status = 404;
            return httpErrors.users[404];
        }

        const updateData: Partial<IUser> = {};

        if (body.password) {
            updateData.password = await hashPassword(body.password);
        }

        if (body.login && body.login !== user.login) {
            const exist = await db.query.users.findFirst({
                where: and(eq(users.login, body.login), not(eq(users.id, params.id))),
            });

            if (exist) {
                set.status = 409;
                return httpErrors.users[409];
            }
            updateData.login = body.login;
        }

        if (body.email && body.email !== user.email) {
            const exist = await db.query.users.findFirst({
                where: and(eq(users.email, body.email), not(eq(users.id, params.id))),
            });

            if (exist) {
                set.status = 409;
                return httpErrors.users[409];
            }
            updateData.email = body.email;
        }

        if (body.phone && body.phone !== user.phone) {
            const exist = await db.query.users.findFirst({
                where: and(eq(users.phone, body.phone), not(eq(users.id, params.id))),
            });

            if (exist) {
                set.status = 409;
                return httpErrors.users[409];
            }
            updateData.phone = body.phone;
        }

        if (body.roleId && body.roleId !== user.roleId) {
            const role = await db.query.roles.findFirst({
                where: eq(roles.id, body.roleId),
            });

            if (!role) {
                set.status = 404;
                return httpErrors.roles[404];
            }
            updateData.roleId = role.id;
        }

        if (Object.keys(updateData).length > 0) {
            const [updatedUser] = await db.update(users).set(updateData).where(eq(users.id, params.id)).returning();
            return updatedUser;
        }

        return user;
    },

    async delete({ set, params }: IUserGetContext): Promise<IUser | { error: string }> {
        const user = await db.query.users.findFirst({
            where: eq(users.id, params.id),
        });

        if (!user) {
            set.status = 404;
            return httpErrors.users[404];
        }

        const [deletedUser] = await db.delete(users).where(eq(users.id, params.id)).returning();

        return deletedUser;
    },
};

async function checkIsRoleExist(roleId: IRole['id']) {
    const role = await db.query.roles.findFirst({ where: eq(roles.id, roleId) });
    return !!role;
}
