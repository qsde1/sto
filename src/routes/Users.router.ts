import { usersHandler } from '../handlers/index';
import Elysia, { t } from 'elysia';
import { IUserCreateBody, IUserUpdateBody } from '../handlers/types/Users.handler';
import { validateBody } from '../services/bodyValidator';

export default new Elysia({ prefix: '/users' })
    .get('', usersHandler.list)
    .get('/:id', usersHandler.getOne, {
        params: t.Object({
            id: t.Number(),
        }),
    })
    .post('', usersHandler.create, {
        body: t.Object({
            name: t.String(),
            login: t.String(),
            password: t.String(),
            email: t.String(),
            phone: t.String(),
            roleId: t.Optional(t.Number()),
        }),
        transform({ body }: { body: IUserCreateBody }) {
            const userCreateProps: Array<keyof IUserCreateBody> = [
                'name',
                'login',
                'password',
                'email',
                'phone',
                'roleId',
            ];
            validateBody<IUserCreateBody>(body, userCreateProps);
        },
    })
    .patch('/:id', usersHandler.update, {
        params: t.Object({ id: t.Number() }),
        body: t.Object({
            name: t.Optional(t.String()),
            login: t.Optional(t.String()),
            password: t.Optional(t.String()),
            email: t.Optional(t.String()),
            phone: t.Optional(t.String()),
            roleId: t.Optional(t.Number()),
        }),
        transform({ body }: { body: IUserUpdateBody }) {
            const userUpdateProps: Array<keyof IUserUpdateBody> = [
                'name',
                'login',
                'password',
                'email',
                'phone',
                'roleId',
            ];
            validateBody<IUserUpdateBody>(body, userUpdateProps);
        },
    })
    .delete('/:id', usersHandler.delete, {
        params: t.Object({ id: t.Number() }),
    });
