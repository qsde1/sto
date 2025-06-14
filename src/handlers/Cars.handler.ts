import type {
    ICarCreateContext,
    ICarGetParamsContext,
    ICarUpdateBody,
    ICarUpdateContext,
} from './types/Cars.handler';
import vinLoader from '../services/vinLoader';
import { db } from '../db/connect';
import { brands, models } from '../db/schema';
import { eq } from 'drizzle-orm';
import { httpErrors } from '../services/httpErrors';
import { ModelModel, type IModel } from '../models/Model.model';
import type { IBrand } from '../models/Brand.model';
import type { ICar } from '../models/Car.model';
import { CarModel } from '../models/Car.model';

export default {
    async getOne({ set, params }: ICarGetParamsContext): Promise<ICar | undefined> {
        return await CarModel.getById(params.id) || undefined;
    },

    async list(): Promise<ICar[]> {
        return await CarModel.getAll();
    },

    async create({ set, body }: ICarCreateContext): Promise<ICar | { error: string }> {
        const { color, number, vin } = body;

        const carDB = await CarModel.getByVin(vin);
        if (carDB) {
            set.status = 409;
            return httpErrors.cars[409];
        }

        const { volumeEngine, type, model, brand, year } = await vinLoader(vin);
        const modelDB = await ModelModel.getOrCreateModelByName(model, brand);

        return await CarModel.create({ 
            color, 
            number, 
            vin, 
            modelId: modelDB?.id, 
            volumeEngine, 
            year, 
            type 
        });
    },

    async update({ set, body, params }: ICarUpdateContext): Promise<ICar | { error: string }> {
        const car = await CarModel.getById(params.id);
        if (!car) {
            set.status = 404;
            return httpErrors.cars[404];
        }

        let dataToUpdate: ICarUpdateBody = {};

        for (const key of Object.keys(body) as Array<keyof ICarUpdateBody>) {
            switch (key) {
                case 'vin': {
                    const vinInfo = await vinLoader(body[key]!);
                    const carDB = await CarModel.getByVin(body[key]!);
                    if (carDB) {
                        set.status = 409;
                        return httpErrors.cars[409];
                    }
                    dataToUpdate = { ...dataToUpdate, ...vinInfo, vin: body[key] };
                    break;
                }

                case 'modelId': {
                    const model = await ModelModel.getById(body.modelId!);
                    if(!model){
                        set.status = 409;
                        return httpErrors.models[409];
                    }
                    dataToUpdate = { ...dataToUpdate, modelId: model?.id };
                    break;
                }

                case 'color': {
                    dataToUpdate.color = body[key];
                    break;
                }

                case 'number': {
                    const carDB = await CarModel.getByNumber(body[key]!)
                    if(carDB) {
                            set.status = 409;
                            return httpErrors.cars[409];
                    }
                    dataToUpdate.number = body[key];
                    break;
                }
            }
        }

        if (Object.keys(dataToUpdate).length) {
            const updatedCar = await CarModel.update(params.id, dataToUpdate);
            if (!updatedCar) {
                set.status = 404;
                return httpErrors.cars[404];
            }
            return updatedCar;
        } else return car;
    },

    async delete({ set, params }: ICarGetParamsContext): Promise<ICar | { error: string }> {
        const car = await CarModel.getById(params.id);
        if (!car) {
            set.status = 404;
            return httpErrors.cars[404];
        }

        const deletedCar = await CarModel.delete(params.id);
        if (!deletedCar) {
            set.status = 404;
            return httpErrors.cars[404];
        }
        return deletedCar;
    },
};
