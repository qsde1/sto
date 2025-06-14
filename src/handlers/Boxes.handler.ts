import type {
    IBoxCreateContext,
    IBoxGetByIdContext,
    IBoxUpdateContext,
    IBoxGetByNumberContext,
} from './types/Boxes.handler';
import type { IBox } from '../models';

import { BoxModel } from '../models';


export default {
    async getOne({ params }: IBoxGetByIdContext): Promise<IBox | undefined> {
        return await BoxModel.getById(params.id);
    },

    async getByNumber({ params }: IBoxGetByNumberContext): Promise<IBox | undefined> {
        return await BoxModel.getByNumber(params.number);
    },

    async list(): Promise<IBox[]> {
        return await BoxModel.getAll();
    },

    async create({ body }: IBoxCreateContext): Promise<IBox> {
        return await BoxModel.create(body);
    },

    async update({ params, body }: IBoxUpdateContext): Promise<IBox | null> {
        return await BoxModel.update(params.id, body);
    },

    async delete({ params }: IBoxGetByIdContext): Promise<boolean> {
        return await BoxModel.delete(params.id);
    }
}
