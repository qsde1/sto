import { db } from '../db/connect';
import { roles } from '../db/schema';
import { eq } from 'drizzle-orm';

export type IRole = {
    id: number;
    name: string;
}

export type CreateRoleDTO = Omit<IRole, 'id'>;
export type UpdateRoleDTO = Partial<CreateRoleDTO>;

export const RoleModel = {
    async getById(id: number): Promise<IRole | null> {
        const role = await db.query.roles.findFirst({
            where: eq(roles.id, id)
        });
        return role || null;
    },
    async getByName(name: string): Promise<IRole | null> {
        const role = await db.query.roles.findFirst({
            where: eq(roles.name, name)
        });
        return role || null;
    },

    async getAll(): Promise<IRole[]> {
        return await db.query.roles.findMany();
    },

   
    async create(data: CreateRoleDTO): Promise<IRole> {
        const [role] = await db.insert(roles)
            .values(data)
            .returning();
        return role;
    },

    async update(id: number, data: UpdateRoleDTO): Promise<IRole | null> {
        const [role] = await db.update(roles)
            .set(data)
            .where(eq(roles.id, id))
            .returning();
        return role;
    },

    async delete(id: number): Promise<IRole | null> {
        const [role] = await db.delete(roles)
            .where(eq(roles.id, id))
            .returning();
        return role;
    },
} 