import type {
    ICar,
    ICarCreateContext,
    ICarGetParamsContext,
    ICarUpdateBody,
    ICarUpdateContext,
} from './types/Cars.handler';
import vinLoader from '../services/vinLoader';
import { db } from '../db/connect';
import { brands, cars, models } from '../db/schema';
import { eq } from 'drizzle-orm';
import { httpErrors } from '../services/httpErrors';
import { IModel } from './types/Models.handler';
import { IBrand } from './types/Brands.handler';

export default {
    async getOne({ set, params }: ICarGetParamsContext): Promise<ICar | undefined> {
        console.log(params);

        const car = await db.query.cars.findFirst({ where: eq(cars.id, params.id) });
        console.log(car);

        return car;
    },
    async list(): Promise<ICar[]> {
        const cars = await db.query.cars.findMany();
        return cars;
    },

    async create({ set, body }: ICarCreateContext): Promise<ICar | { error: string }> {
        const { color, number, vin } = body;

        let carDB = await db.query.cars.findFirst({ where: eq(cars.vin, vin) });
        if (carDB) {
            set.status = 409;
            return httpErrors.cars[409];
        }

        const { volumeEngine, type, model, brand, year } = await vinLoader(vin);
        const modelDB = await getCarModelByName(model, brand);

        [carDB] = await db
            .insert(cars)
            .values({ color, number, vin, modelId: modelDB?.id, volumeEngine, year, type })
            .returning();

        return carDB;
    },
    async update({ set, body, params }: ICarUpdateContext): Promise<ICar | { error: string }> {
        console.log(body);
        const car = await db.query.cars.findFirst({ where: eq(cars.id, params.id) });
        if (!car) {
            set.status = 404;
            return httpErrors.cars[404];
        }

        let dataToUpdate: ICarUpdateBody = {};

        for (const key of Object.keys(body) as Array<keyof ICarUpdateBody>) {
            switch (key) {
                case 'vin': {
                    const vinInfo = await vinLoader(body[key]!);
                    dataToUpdate = { ...dataToUpdate, ...vinInfo, vin: body[key] };
                    break;
                }

                case 'modelId': {
                    const model = await db.query.models.findFirst({ where: eq(models.id, body.modelId!) });
                    dataToUpdate = { ...dataToUpdate, modelId: model?.id };
                    break;
                }

                case 'color': {
                    dataToUpdate.color = body[key];
                    break;
                }

                case 'number': {
                    dataToUpdate.number = body[key];
                    break;
                }
            }
        }

        if (Object.keys(dataToUpdate).length) {
            const [updatedCar] = await db.update(cars).set(dataToUpdate).where(eq(cars.id, car.id)).returning();
            return updatedCar;
        } else return car;
    },
    async delete({ set, params }: ICarGetParamsContext): Promise<ICar | { error: string }> {
        const car = await db.query.cars.findFirst({ where: eq(cars.id, params.id) });
        if (!car) {
            set.status = 404;
            return httpErrors.cars[404];
        }

        const [deletedCar] = await db.delete(cars).where(eq(cars.id, params.id)).returning();
        return deletedCar;
    },
};

async function getCarModelByName(modelName: IModel['name'], brandName: IBrand['name']): Promise<IModel> {
    let modelDB = await db.query.models.findFirst({
        where: eq(models.name, modelName),
    });

    if (!modelDB) {
        let brandDB = await db.query.brands.findFirst({ where: eq(brands.name, brandName) });
        if (!brandDB) {
            [brandDB] = await db.insert(brands).values({ name: brandName }).returning();
        }
        [modelDB] = await db.insert(models).values({ name: modelName, brandId: brandDB?.id }).returning();
    }
    return modelDB;
}
