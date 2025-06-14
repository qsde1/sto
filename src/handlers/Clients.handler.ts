import { ClientModel } from '../models';

import type {
    IClientCreateContext,
    IClientGetContext,
    IClientUpdateContext,
    IClientGetByPhoneContext,
    IClientGetByEmailContext,
} from './types/Clients.handler';
import type { IClient } from '../models';

export default {
    async list(): Promise<IClient[]> {
        return await ClientModel.getAll();
    },

    async getOne({ params }: IClientGetContext): Promise<IClient | undefined> {
        return await ClientModel.getById(params.id);
    },

    async getByPhone({ params }: IClientGetByPhoneContext): Promise<IClient | undefined> {
        return await ClientModel.getByPhone(params.phone);
    },

    async getByEmail({ params }: IClientGetByEmailContext): Promise<IClient | undefined> {
        return await ClientModel.getByEmail(params.email);
    },

    async create({ body }: IClientCreateContext): Promise<IClient> {
        return await ClientModel.create(body);
    },

    async update({ params, body }: IClientUpdateContext): Promise<IClient | null> {
        return await ClientModel.update(params.id, body);
    },

    async delete({ params }: IClientGetContext): Promise<boolean> {
        return await ClientModel.delete(params.id);
    }
}

