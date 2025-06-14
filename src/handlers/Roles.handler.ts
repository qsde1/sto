import type { IRoleCreateContext, IRoleGetContext, IRoleUpdateContext } from './types/Roles.handler';
import { httpErrors } from '../services/httpErrors';
import { RoleModel } from '../models/Role.model';
import type { IRole } from '../models/Role.model';

export default {
    async getOne({ set, params }: IRoleGetContext): Promise<IRole | null> {
        return await RoleModel.getById(params.id);
    },

    async list(): Promise<IRole[]> {
        return await RoleModel.getAll();
    },

    async create({ set, body }: IRoleCreateContext): Promise<IRole | { error: string }> {
        const existingRole = await RoleModel.getByName(body.name);

        if (existingRole) {
            set.status = 409;
            return httpErrors.roles[409];
        }

        return await RoleModel.create(body);
    },

    async update({ set, body, params }: IRoleUpdateContext): Promise<IRole | { error: string } | null> {
        const role = await RoleModel.getById(params.id);

        if (!role) {
            set.status = 404;
            return httpErrors.roles[404];
        }

        if (body.name && body.name !== role.name) {
            const exist = await RoleModel.getByName(body.name);
            if (exist) {
                set.status = 409;
                return httpErrors.roles[409];
            }
        }

        const updatedRole = await RoleModel.update(params.id, body);
      

        return updatedRole;
    },

    async delete({ set, params }: IRoleGetContext): Promise<IRole | { error: string } | null> {
        const role = await RoleModel.getById(params.id);

        if (!role) {
            set.status = 404;
            return httpErrors.roles[404];
        }

        const deletedRole = await RoleModel.delete(params.id);

        return deletedRole;
    },
};
