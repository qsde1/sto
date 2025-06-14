import type {
    IWorktypePart,
    IWorktypePartCreateContext,
    IWorktypePartGetContext,
    IWorktypePartUpdateContext,
    IWorktypePartGetByWorktypeContext,
    IWorktypePartGetByPartContext,
    IWorktypePartWithPartAndWorkType,
} from './types/WorkTypePart.handler';
import { WorkTypePartModel } from '../models';
import { WorkTypeModel } from '../models';
import { PartModel } from '../models';
import { httpErrors } from '../services/httpErrors';

export default {
    async list(): Promise<IWorktypePartWithPartAndWorkType[]> {
        return await WorkTypePartModel.list();
    },

    async getOne({ params }: IWorktypePartGetContext): Promise<IWorktypePartWithPartAndWorkType | { error: string } | null> {
        return await WorkTypePartModel.getById(params.worktypeId, params.partId) ?? null;
    },

    async getByWorktype({ params }: IWorktypePartGetByWorktypeContext): Promise<IWorktypePartWithPartAndWorkType[] | { error: string } | null> {
        return await WorkTypePartModel.getByWorktypeId(params.worktypeId) ?? null;
    },

    async getByPart({ params }: IWorktypePartGetByPartContext): Promise<IWorktypePartWithPartAndWorkType[] | { error: string }> {
        return await WorkTypePartModel.getByPartId(params.partId);
    },

    async create({ body }: IWorktypePartCreateContext): Promise<IWorktypePart | { error: string }> {
        const workType = await WorkTypeModel.getById(body.worktypeId);

        if (!workType) {
            return httpErrors.workTypes[404];
        }

        const part = await PartModel.getById(body.partId);

        if (!part) {
            return httpErrors.parts[404];
        }

        return await WorkTypePartModel.create({
            worktypeId: body.worktypeId,
            partId: body.partId,
            quantity: body.quantity,
        });
    },

    async update({ params, body }: IWorktypePartUpdateContext): Promise<IWorktypePart | { error: string }> {
        const relation = await WorkTypePartModel.getById(params.worktypeId, params.partId);

        if (!relation) {
            return httpErrors.worktypeParts[404];
        }

        const updatedRelation = await WorkTypePartModel.update(params.worktypeId, params.partId, {
            quantity: body.quantity,
        });

        if (!updatedRelation) {
            return httpErrors.worktypeParts[404];
        }

        return updatedRelation;
    },

    async delete({ params }: IWorktypePartGetContext): Promise<IWorktypePart | { success: boolean } | { error: string } | null> {
        const relation = await WorkTypePartModel.getById(params.worktypeId, params.partId);

        if (!relation) {
            return httpErrors.worktypeParts[404];
        }

        const deletedRelation = await WorkTypePartModel.delete(params.worktypeId, params.partId);

        if (!deletedRelation) {
            return httpErrors.worktypeParts[404];
        }

        return deletedRelation;
    },
};
