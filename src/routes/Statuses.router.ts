import { statusesHandler } from '../handlers/index';
import Elysia, { t } from 'elysia';
import { IStatusCreateBody, IStatusUpdateBody } from '../handlers/types/Statuses.handler';
import { validateBody } from '../services/bodyValidator';

export default new Elysia({ prefix: '/statuses' })
    .get('', statusesHandler.list)
    .get('/:id', statusesHandler.getOne, {
        params: t.Object({
            id: t.Number(),
        }),
    })
    .post('', statusesHandler.create, {
        body: t.Object({
            name: t.String(),
        }),
        transform({ body }) {
            validateBody<IStatusCreateBody>(body, ['name']);
        },
    })
    .patch('/:id', statusesHandler.update, {
        params: t.Object({
            id: t.Number(),
        }),
        body: t.Object({
            name: t.Optional(t.String()),
        }),
        transform({ body }) {
            validateBody<IStatusUpdateBody>(body, ['name']);
        },
    })
    .delete('/:id', statusesHandler.delete, {
        params: t.Object({
            id: t.Number(),
        }),
    });
