import type {
    IApplicationCreateContext,
    IApplicationGetContext,
    IApplicationUpdateContext,
    IApplicationGetByCarContext,
    IApplicationGetByStatusContext,
    IApplicationGetByUserContext,
} from './types/Applications.handler';
import { ApplicationModel } from '../models';
import { db } from '../db/connect';
import { applications, cars, statuses, users, boxes } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { httpErrors } from '../services/httpErrors';
import { statusesHandler, usersHandler } from './index';
import notifyUser from '../services/notifyUser';

import type { IApplication, IApplicationWithDependencies } from '../models';



export default {

    async listen(): Promise<IApplicationWithDependencies[]> {
        return await ApplicationModel.getAll();
    },

    async getOne({ set, params }: IApplicationGetContext): Promise<IApplication | null> {
        return await ApplicationModel.getById(params.id);
    },

    async getByUserId({ set, params }: IApplicationGetByUserContext): Promise<IApplication[]> {
        return await ApplicationModel.getByUserId(params.idUser);
    },

    async getByCarId({ set, params }: IApplicationGetByCarContext): Promise<IApplication[]> {
        return await ApplicationModel.getByCarId(params.idCar);
    },

    async getByStatusId({ set, params }: IApplicationGetByStatusContext): Promise<IApplication[]> {
        return await ApplicationModel.getByStatusId(params.idStatus);
    },

    async create({ set, body }: IApplicationCreateContext): Promise<IApplication> {
        return await ApplicationModel.create(body);
    },

    async update({ set, params, body }: IApplicationUpdateContext): Promise<IApplication | null> {
        return await ApplicationModel.update(params.id, body);
    },


        // async update({ set, params, body }: IApplicationUpdateContext): Promise<IApplication | { error: string }> {
    //     const application = await db.query.applications.findFirst({
    //         where: eq(applications.id, params.id),
    //     });

    //     if (!application) {
    //         set.status = 404;
    //         return httpErrors.applications[404];
    //     }

    //     if (body.idStatus) {
    //         const status = await db.query.statuses.findFirst({
    //             where: eq(statuses.id, body.idStatus),
    //         });
    //         if (!status) {
    //             set.status = 404;
    //             return httpErrors.statuses[404];
    //         }
    //     }

    //     if (body.idBox) {
    //         const box = await db.query.boxes.findFirst({
    //             where: eq(boxes.id, body.idBox),
    //         });
    //         if (!box) {
    //             set.status = 404;
    //             return httpErrors.boxes[404];
    //         }
    //     }

    //     if (Object.keys(body).length > 0) {
    //         const [updatedApplication] = await db
    //             .update(applications)
    //             .set(body)
    //             .where(eq(applications.id, params.id))
    //             .returning();
    //         return updatedApplication;
    //     }

    //     return application;
    // },


    async delete({ set, params }: IApplicationGetContext): Promise<boolean> {
        return await ApplicationModel.delete(params.id);
    },

    // async list(): Promise<IApplicationWithDependencies[]> {
    //     return await db.query.applications.findMany({
    //         with: {
    //             car: true,
    //             status: true,
    //             user: true,
    //             box: true,
    //         },
    //     });
    // },

    // async getOne({ set, params }: IApplicationGetContext): Promise<IApplication | { error: string }> {
    //     const application = await db.query.applications.findFirst({
    //         where: eq(applications.id, params.id),
    //         with: {
    //             car: true,
    //             status: true,
    //             user: true,
    //             box: true,
    //         },
    //     });

    //     if (!application) {
    //         set.status = 404;
    //         return httpErrors.applications[404];
    //     }

    //     return application;
    // },

    // async getByCar({ set, params }: IApplicationGetByCarContext): Promise<IApplication[] | { error: string }> {
    //     const car = await db.query.cars.findFirst({
    //         where: eq(cars.id, params.idCar),
    //     });

    //     if (!car) {
    //         set.status = 404;
    //         return httpErrors.cars[404];
    //     }

    //     return await db.query.applications.findMany({
    //         where: eq(applications.idCar, params.idCar),
    //     });
    // },

    // async getByStatus({ set, params }: IApplicationGetByStatusContext): Promise<IApplication[] | { error: string }> {
    //     const status = await db.query.statuses.findFirst({
    //         where: eq(statuses.id, params.idStatus),
    //     });

    //     if (!status) {
    //         set.status = 404;
    //         return httpErrors.statuses[404];
    //     }

    //     return await db.query.applications.findMany({
    //         where: eq(applications.idStatus, params.idStatus),
    //     });
    // },

    // async getByUser({ set, params }: IApplicationGetByUserContext): Promise<IApplication[] | { error: string }> {
    //     const user = await db.query.users.findFirst({
    //         where: eq(users.id, params.idUser),
    //     });

    //     if (!user) {
    //         set.status = 404;
    //         return httpErrors.users[404];
    //     }

    //     return await db.query.applications.findMany({
    //         where: eq(applications.idUser, params.idUser),
    //     });
    // },

    // async getByBox({ set, params }: IApplicationGetByBoxContext): Promise<IApplication[] | { error: string }> {
    //     if (params.idBox) {
    //         const box = await db.query.boxes.findFirst({
    //             where: eq(boxes.id, params.idBox),
    //         });

    //         if (!box) {
    //             set.status = 404;
    //             return httpErrors.boxes[404];
    //         }
    //     }

    //     return await db.query.applications.findMany({
    //         where: eq(applications.idBox, params.idBox!),
    //     });
    // },

    // async create({ set, body }: IApplicationCreateContext): Promise<IApplication | { error: string }> {
    //     const car = await db.query.cars.findFirst({
    //         where: eq(cars.id, body.idCar),
    //     });
    //     if (!car) {
    //         set.status = 404;
    //         return httpErrors.cars[404];
    //     }

    //     const status = await db.query.statuses.findFirst({
    //         where: eq(statuses.id, body.idStatus),
    //     });
    //     if (!status) {
    //         set.status = 404;
    //         return httpErrors.statuses[404];
    //     }

    //     const user = await db.query.users.findFirst({
    //         where: eq(users.id, body.idUser),
    //     });
    //     if (!user) {
    //         set.status = 404;
    //         return httpErrors.users[404];
    //     }

    //     if (body.idBox) {
    //         const box = await db.query.boxes.findFirst({
    //             where: eq(boxes.id, body.idBox),
    //         });
    //         if (!box) {
    //             set.status = 404;
    //             return httpErrors.boxes[404];
    //         }
    //     }

    //     const [newApplication] = await db
    //         .insert(applications)
    //         .values({
    //             ...body,
    //             startDate: Date.now(),
    //         })
    //         .returning();

    //     return newApplication;
    // },




};
