import { db } from '../db/connect';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { IRole } from './Role.model';

export type IUser = {
    id: number;
    name: string;
    login: string;
    password: string;
    email: string;
    phone: string;
    roleId: number | null;
};

export type IUserWithRole = IUser & {
    role: IRole | null;
};

export type CreateUserDTO = Omit<IUser, 'id'>;
export type UpdateUserDTO = Partial<CreateUserDTO>;

export const UserModel = {
    async getById(id: number): Promise<IUserWithRole | null> {
        const user = await db.query.users.findFirst({
            where: eq(users.id, id),
            with: {
                role: true
            }
        });
        return user || null;
    },

    async getByLogin(login: string): Promise<IUserWithRole | null> {
        const user = await db.query.users.findFirst({
            where: eq(users.login, login),
            with: {
                role: true
            }
        });
        return user || null;
    },

    async getByEmail(email: string): Promise<IUserWithRole | null> {
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
            with: {
                role: true
            }
        });
        return user || null;
    },

    async getByPhone(phone: string): Promise<IUserWithRole | null> {
        const user = await db.query.users.findFirst({
            where: eq(users.phone, phone),
            with: {
                role: true
            }
        });
        return user || null;
    },

    async getAll(): Promise<IUserWithRole[]> {
        return await db.query.users.findMany({
            with: {
                role: true
            }
        });
    },

    async create(data: CreateUserDTO): Promise<IUserWithRole | null> {
        const [user] = await db.insert(users)
            .values(data)
            .returning();
            
        const createdUser = await db.query.users.findFirst({
            where: eq(users.id, user.id),
            with: {
                role: true
            }
        });
        
        if (!createdUser) {
           return null;
        }
        
        return createdUser;
    },

    async update(id: number, data: UpdateUserDTO): Promise<IUserWithRole | null> {
        const [user] = await db.update(users)
            .set(data)
            .where(eq(users.id, id))
            .returning();
            
        if (!user) return null;
        
        const updatedUser = await db.query.users.findFirst({
            where: eq(users.id, id),
            with: {
                role: true
            }
        });
        
        return updatedUser || null;
    },

    async delete(id: number): Promise<IUserWithRole | null> {
        const user = await this.getById(id);
        if (!user) return null;
        
        await db.delete(users)
            .where(eq(users.id, id));
            
        return user;
    }
}; 