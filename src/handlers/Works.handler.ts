import type {
    IWork,
    IWorkCreateContext,
    IWorkGetContext,
    IWorkUpdateContext,
    IWorkGetByApplicationContext,
    IWorkGetByUserContext,
    IWorkGetByWorktypeContext,
} from './types/Works.handler';
import { db } from '../db/connect';
import { works, applications, users, workTypes } from '../db/schema';
import { eq } from 'drizzle-orm';
import { httpErrors } from '../services/httpErrors';

export default {
    async list(): Promise<IWork[]> {
        return await db.query.works.findMany({
            with: {
                application: true,
                user: true,
                workType: true,
            },
        });
    },

    async getOne({ set, params }: IWorkGetContext): Promise<IWork | { error: string }> {
        const work = await db.query.works.findFirst({
            where: eq(works.id, params.id),
            with: {
                application: true,
                user: true,
                workType: true,
            },
        });

        if (!work) {
            set.status = 404;
            return httpErrors.works[404];
        }

        return work;
    },

    async getByApplication({ set, params }: IWorkGetByApplicationContext): Promise<IWork[] | { error: string }> {
        const application = await db.query.applications.findFirst({
            where: eq(applications.id, params.idApplication),
        });

        if (!application) {
            set.status = 404;
            return httpErrors.applications[404];
        }

        return await db.query.works.findMany({
            where: eq(works.idApplication, params.idApplication),
            with: {
                user: true,
                workType: true,
            },
        });
    },

    async getByUser({ set, params }: IWorkGetByUserContext): Promise<IWork[] | { error: string }> {
        const user = await db.query.users.findFirst({
            where: eq(users.id, params.idUser),
        });

        if (!user) {
            set.status = 404;
            return httpErrors.users[404];
        }

        return await db.query.works.findMany({
            where: eq(works.idUser, params.idUser),
            with: {
                application: true,
                workType: true,
            },
        });
    },

    async getByWorktype({ set, params }: IWorkGetByWorktypeContext): Promise<IWork[] | { error: string }> {
        const workType = await db.query.workTypes.findFirst({
            where: eq(workTypes.id, params.idWorktype),
        });

        if (!workType) {
            set.status = 404;
            return httpErrors.workTypes[404];
        }

        return await db.query.works.findMany({
            where: eq(works.idWorktype, params.idWorktype),
            with: {
                application: true,
                user: true,
            },
        });
    },

    async create({ set, body }: IWorkCreateContext): Promise<IWork | { error: string }> {
        const application = await db.query.applications.findFirst({
            where: eq(applications.id, body.idApplication),
        });
        if (!application) {
            set.status = 404;
            return httpErrors.applications[404];
        }

        const user = await db.query.users.findFirst({
            where: eq(users.id, body.idUser),
        });
        if (!user) {
            set.status = 404;
            return httpErrors.users[404];
        }

        const workType = await db.query.workTypes.findFirst({
            where: eq(workTypes.id, body.idWorktype),
        });
        if (!workType) {
            set.status = 404;
            return httpErrors.workTypes[404];
        }

        const [newWork] = await db
            .insert(works)
            .values({
                ...body,
                startDate: new Date().getTime(),
            })
            .returning();

        return newWork;
    },

    async update({ set, params, body }: IWorkUpdateContext): Promise<IWork | { error: string }> {
        const work = await db.query.works.findFirst({
            where: eq(works.id, params.id),
        });

        if (!work) {
            set.status = 404;
            return httpErrors.works[404];
        }

        if (body.idUser) {
            const user = await db.query.users.findFirst({
                where: eq(users.id, body.idUser),
            });
            if (!user) {
                set.status = 404;
                return httpErrors.users[404];
            }
        }

        if (Object.keys(body).length > 0) {
            const [updatedWork] = await db.update(works).set(body).where(eq(works.id, params.id)).returning();
            return updatedWork;
        }

        return work;
    },

    async delete({ set, params }: IWorkGetContext): Promise<IWork | { error: string }> {
        const work = await db.query.works.findFirst({
            where: eq(works.id, params.id),
        });

        if (!work) {
            set.status = 404;
            return httpErrors.works[404];
        }

        const [deletedWork] = await db.delete(works).where(eq(works.id, params.id)).returning();

        return deletedWork;
    },
};
