import type {
    IUserCreateContext,
    IUserGetContext,
    IUserUpdateContext,
    IUserGetByLoginContext,
} from './types/Users.handler';
import { httpErrors } from '../services/httpErrors';
import { hashPassword } from '../services/bcrypt';
import { UserModel, type IUserWithRole } from '../models/User.model';
import { RoleModel } from '../models/Role.model';

export default {
    async getOne({ set, params }: IUserGetContext): Promise<IUserWithRole| null> {
        return await UserModel.getById(params.id);
    },

    async getOneByLogin({ set, params }: IUserGetByLoginContext): Promise<IUserWithRole | null> {
        return await UserModel.getByLogin(params.login);
    },

    async list(): Promise<IUserWithRole[]> {
        return await UserModel.getAll();
    },

    async create({ set, body }: IUserCreateContext): Promise<IUserWithRole | { error: string } | null> {
        const existingUser = await UserModel.getByLogin(body.login) || 
                           await UserModel.getByEmail(body.email) || 
                           await UserModel.getByPhone(body.phone);

        if (existingUser) {
            set.status = 409;
            return httpErrors.users[409];
        }

        const hashedPassword = await hashPassword(body.password);

        if (body.roleId && !(await RoleModel.getById(body.roleId))) {
            set.status = 404;
            return httpErrors.roles[404];
        }

        return await UserModel.create({
            ...body,
            password: hashedPassword,
        });
    },

    async update({ set, body, params }: IUserUpdateContext): Promise<IUserWithRole | { error: string } | null> {
        const user = await UserModel.getById(params.id);

        if (!user) {
            set.status = 404;
            return httpErrors.users[404];
        }

        const updateData: Partial<typeof body> = {};

        if (body.password) {
            updateData.password = await hashPassword(body.password);
        }

        if (body.login && body.login !== user.login) {
            const exist = await UserModel.getByLogin(body.login);
            if (exist) {
                set.status = 409;
                return httpErrors.users[409];
            }
            updateData.login = body.login;
        }

        if (body.email && body.email !== user.email) {
            const exist = await UserModel.getByEmail(body.email);
            if (exist) {
                set.status = 409;
                return httpErrors.users[409];
            }
            updateData.email = body.email;
        }

        if (body.phone && body.phone !== user.phone) {
            const exist = await UserModel.getByPhone(body.phone);
            if (exist) {
                set.status = 409;
                return httpErrors.users[409];
            }
            updateData.phone = body.phone;
        }

        if (body.roleId && body.roleId !== user.roleId) {
            const role = await RoleModel.getById(body.roleId);
            if (!role) {
                set.status = 404;
                return httpErrors.roles[404];
            }
            updateData.roleId = role.id;
        }

        if (Object.keys(updateData).length > 0) {
            const updatedUser = await UserModel.update(params.id, updateData);
          
            return updatedUser;
        }

        return user;
    },

    async delete({ set, params }: IUserGetContext): Promise<IUserWithRole | null> {
        return await UserModel.delete(params.id);
    },
};
