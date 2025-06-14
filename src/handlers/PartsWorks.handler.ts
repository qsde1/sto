import type {
    IPartsWork,
    IPartsWorkWithRelations,
    CreatePartsWorkDTO,
    UpdatePartsWorkDTO,
} from '../models/PartsWork.model';
import type {
    IPartWorkCreateContext,
    IPartWorkGetContext,
    IPartWorkUpdateContext,
    IPartWorkGetByWorkContext,
    IPartWorkGetByPartContext,
} from './types/PartsWorks.handler';
import { PartsWorkModel } from '../models';
import { WorkModel } from '../models';
import { PartModel } from '../models';
import { httpErrors } from '../services/httpErrors';

export default {
    async list(): Promise<IPartsWorkWithRelations[]> {
        return await PartsWorkModel.list();
    },

    async getOne({ params }: IPartWorkGetContext): Promise<IPartsWorkWithRelations | { error: string } | null> {
        return await PartsWorkModel.getById(params.workId, params.partId) ?? null;
    },

    async getByWork({ params }: IPartWorkGetByWorkContext): Promise<IPartsWorkWithRelations[] | { error: string } | null> {
        return await PartsWorkModel.getByWorkId(params.workId);
    },

    async getByPart({ set, params }: IPartWorkGetByPartContext): Promise<IPartsWorkWithRelations[] | { error: string } | null> {
        return await PartsWorkModel.getByPartId(params.partId);
    },

    async create({ set, body }: IPartWorkCreateContext): Promise<IPartsWork | { error: string }> {
        const work = await WorkModel.getById(body.workId);
        if (!work) {
            set.status = 404;
            return httpErrors.works[404];
        }

        const part = await PartModel.getById(body.partId);
        if (!part) {
            set.status = 404;
            return httpErrors.parts[404];
        }

        try {
            return await PartsWorkModel.create(body);
        } catch (e) {
            set.status = 409;
            return httpErrors.partsWorks[409];
        }
    },

    async update({ set, params, body }: IPartWorkUpdateContext): Promise<IPartsWork | { error: string }> {
        const relation = await PartsWorkModel.getById(params.workId, params.partId);

        if (!relation) {
            set.status = 404;
            return httpErrors.partsWorks[404];
        }

        if (body.quantity !== undefined) {
            const updatedRelation = await PartsWorkModel.update(params.workId, params.partId, {
                quantity: body.quantity,
            });

            if (!updatedRelation) {
                set.status = 404;
                return httpErrors.partsWorks[404];
            }

            return updatedRelation;
        }

        return relation;
    },

    async delete({ set, params }: IPartWorkGetContext): Promise<IPartsWork | { error: string }> {
        const relation = await PartsWorkModel.getById(params.workId, params.partId);

        if (!relation) {
            set.status = 404;
            return httpErrors.partsWorks[404];
        }

        const deletedRelation = await PartsWorkModel.delete(params.workId, params.partId);

        if (!deletedRelation) {
            set.status = 404;
            return httpErrors.partsWorks[404];
        }

        return deletedRelation;
    },
};
