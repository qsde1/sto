import { db } from '../db/connect';
import { applications, cars, users, statuses, boxes } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { ICar, IStatus, IUser, IBox } from './index';

// Кастомные ошибки
export class EntityNotFoundError extends Error {
    constructor(entity: string, id: number) {
        super(`${entity} with id ${id} not found`);
        this.name = 'EntityNotFoundError';
    }
}

export type IApplication = {
    id: number;
    createdAt: number;
    clientComment: string | null;
    idCar: number;
    idStatus: number;
    idUser: number;
    startDate: number;
    closeDate: number | null;
    idBox: number | null;
    price: string | null;
}

export type IApplicationWithDependencies = IApplication & {
    car: ICar;
    status: IStatus;
    user: IUser;
    box: IBox | null;
}

export type CreateApplicationDTO = Omit<IApplication, 'id' | 'createdAt'>;
export type UpdateApplicationDTO = Partial<CreateApplicationDTO>;

export const ApplicationModel = {
    async create(data: CreateApplicationDTO): Promise<IApplication> {
        const [application] = await db.insert(applications)
            .values({
                ...data,
                createdAt: Date.now()
            })
            .returning();
        return application;
    },

    async getById(id: number): Promise<IApplication | undefined> {
        return await db.query.applications.findFirst({
            where: eq(applications.id, id),
            with: {
                car: {
                    with: {
                        model: {
                            with: {
                                brand: true
                            }
                        }
                    }
                },
                status: true,
                user: true,
                box: true,
                works: {
                    with: {
                        workType: true,
                        user: true,
                        parts: {
                            with: {
                                part: true
                            }
                        }
                    }
                }
            }
        });
    },

    async getAll(): Promise<IApplicationWithDependencies[]> {
        return await db.query.applications.findMany({
            with: {
                car: {
                    with: {
                        model: {
                            with: {
                                brand: true
                            }
                        }
                    }
                },
                status: true,
                user: true,
                box: true,
                works: {
                    with: {
                        workType: true,
                        user: true,
                        parts: {
                            with: {
                                part: true
                            }
                        }
                    }
                }
            }
        });
    },

    async getByUserId(userId: number): Promise<IApplication[]> {
        return await db.query.applications.findMany({
            where: eq(applications.idUser, userId)
        });
    },

    async getByCarId(carId: number): Promise<IApplication[]> {
        return await db.query.applications.findMany({
            where: eq(applications.idCar, carId)
        });
    },

    async getByStatusId(statusId: number): Promise<IApplication[]> {
        return await db.query.applications.findMany({
            where: eq(applications.idStatus, statusId)
        });
    },

    async update(id: number, data: UpdateApplicationDTO): Promise<IApplication | null> {
        const [application] = await db.update(applications)
            .set(data)
            .where(eq(applications.id, id))
            .returning();
        return application || null;
    },

    async delete(id: number): Promise<boolean> {
        const [deletedApplication] = await db.delete(applications)
            .where(eq(applications.id, id))
            .returning();
        return !!deletedApplication;
    }
} 