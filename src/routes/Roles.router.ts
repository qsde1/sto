import { rolesHandler } from '../handlers/index';
import Elysia, { t } from 'elysia';
import { IRoleCreateBody, IRoleUpdateBody } from '../handlers/types/Roles.handler';
import { validateBody } from '../services/bodyValidator';

export default new Elysia({ prefix: '/roles' })
    .get('', rolesHandler.list)
    .get('/:id', rolesHandler.getOne, {
        params: t.Object({
            id: t.Number(),
        }),
    })
    .post('', rolesHandler.create, {
        body: t.Object({
            name: t.String(),
        }),
        transform({ body }: { body: IRoleCreateBody }) {
            const roleCreateProps: Array<keyof IRoleCreateBody> = ['name'];
            validateBody<IRoleCreateBody>(body, roleCreateProps);
        },
    })
    .patch('/:id', rolesHandler.update, {
        params: t.Object({ id: t.Number() }),
        body: t.Object({
            name: t.Optional(t.String()),
        }),
        transform({ body }: { body: IRoleUpdateBody }) {
            const roleUpdateProps: Array<keyof IRoleUpdateBody> = ['name'];
            validateBody<IRoleUpdateBody>(body, roleUpdateProps);
        },
    })
    .delete('/:id', rolesHandler.delete, {
        params: t.Object({ id: t.Number() }),
    });
