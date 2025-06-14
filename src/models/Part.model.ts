import { db } from '../db/connect';
import { parts } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { ISupplier } from './Supplier.model';

export type IPart = {
    id: number;
    name: string;
    price: number;
    idSuppliers: number | null;
    manufacturer: string | null;
    quantity: number;
}

export type IPartWithSupplier = IPart & {
    supplier: ISupplier | null;
}

export type CreatePartDTO = Omit<IPart, 'id'>;

export class PartModel {
    static async getAll(): Promise<IPartWithSupplier[]> {
        return await db.query.parts.findMany({
            with: { supplier: true },
        });
    }

    static async getById(id: number): Promise<IPartWithSupplier | null> {
        const part = await db.query.parts.findFirst({
            where: eq(parts.id, id),
            with: { supplier: true },
        });
        return part ?? null;
    }

    static async getByName(name: string): Promise<IPartWithSupplier | null> {
        const part = await db.query.parts.findFirst({
            where: eq(parts.name, name),
            with: { supplier: true },
        });
        return part ?? null;
    }

    static async getBySupplierId(supplierId: number): Promise<IPartWithSupplier[]> {
        return await db.query.parts.findMany({
            where: eq(parts.idSuppliers, supplierId),
            with: {supplier: true}
        });
    }

    static async create(data: CreatePartDTO): Promise<IPart> {
        const [newPart] = await db
            .insert(parts)
            .values(data)
            .returning();
        return newPart;
    }

    static async update(id: number, data: Partial<CreatePartDTO>): Promise<IPart | null> {
        const [updatedPart] = await db
            .update(parts)
            .set(data)
            .where(eq(parts.id, id))
            .returning();
        return updatedPart ?? null;
    }

    static async delete(id: number): Promise<IPart | null> {
        const [deletedPart] = await db
            .delete(parts)
            .where(eq(parts.id, id))
            .returning();
        return deletedPart ?? null;
    }
} 