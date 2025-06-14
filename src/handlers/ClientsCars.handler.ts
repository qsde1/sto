import type {
    IClientCarCreateContext,
    IClientCarGetContext,
    IClientCarUpdateContext,
    IClientCarGetByClientContext,
    IClientCarGetByCarContext,
} from './types/ClientsCars.handler';
import type { IClientCar } from '../models';
import { ClientCarModel } from '../models';

export default {
    async list(): Promise<IClientCar[]> {
        return await ClientCarModel.getAll();
    },

    async getOne({ params }: IClientCarGetContext): Promise<IClientCar | undefined> {
        return await ClientCarModel.getByClientAndCar(params.clientId, params.carId);
    },

    async getByClient({ params }: IClientCarGetByClientContext): Promise<IClientCar[]> {
        return await ClientCarModel.getByClient(params.clientId);
    },

    async getByCar({ params }: IClientCarGetByCarContext): Promise<IClientCar[]> {
        return await ClientCarModel.getByCar(params.carId);
    },

    async create({ body }: IClientCarCreateContext): Promise<IClientCar> {
        return await ClientCarModel.create(body);
    },

    async update({ params, body }: IClientCarUpdateContext): Promise<IClientCar | null> {
        return await ClientCarModel.update(params.clientId, params.carId, body);
    },

    async archive({ params }: IClientCarGetContext): Promise<IClientCar | null> {
        return await ClientCarModel.archive(params.clientId, params.carId);
    },

    async delete({ params }: IClientCarGetContext): Promise<IClientCar | null> {
        return await ClientCarModel.delete(params.clientId, params.carId);
    }
};
