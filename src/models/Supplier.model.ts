import { db } from '../db/connect';
import { suppliers } from '../db/schema';
import { eq } from 'drizzle-orm';

export type ISupplier = {
    id: number;
    name: string;
    contacts: string | null;
}

export type CreateSupplierDTO = Omit<ISupplier, 'id'>;

export class SupplierModel {
    static async getAll(): Promise<ISupplier[]> {
        return await db.query.suppliers.findMany();
    }

    static async getById(id: number): Promise<ISupplier | null> {
        const supplier = await db.query.suppliers.findFirst({
            where: eq(suppliers.id, id),
        });
        return supplier ?? null;
    }

    static async getByName(name: string): Promise<ISupplier | null> {
        const supplier = await db.query.suppliers.findFirst({
            where: eq(suppliers.name, name),
        });
        return supplier ?? null;
    }

    static async create(data: CreateSupplierDTO): Promise<ISupplier> {
        const [newSupplier] = await db
            .insert(suppliers)
            .values(data)
            .returning();
        return newSupplier;
    }

    static async update(id: number, data: Partial<CreateSupplierDTO>): Promise<ISupplier | null> {
        const [updatedSupplier] = await db
            .update(suppliers)
            .set(data)
            .where(eq(suppliers.id, id))
            .returning();
        return updatedSupplier ?? null;
    }

    static async delete(id: number): Promise<ISupplier | null> {
        const [deletedSupplier] = await db
            .delete(suppliers)
            .where(eq(suppliers.id, id))
            .returning();
        return deletedSupplier;
    }
} 