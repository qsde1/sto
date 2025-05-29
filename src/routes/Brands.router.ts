import { brandsHandler } from '../handlers';
import Elysia, { t } from 'elysia';
import { IBrandCreateBody, IBrandUpdateBody } from '../handlers/types/Brands.handler';
import { validateBody } from '../services/bodyValidator';

export default new Elysia({ prefix: '/brands' })
    .get('', brandsHandler.list)
    .get('/:id', brandsHandler.getOne, {
        params: t.Object({
            id: t.Number(),
        }),
    })
    .get('/by-name/:name', brandsHandler.getByName, {
        params: t.Object({
            name: t.String(),
        }),
    })
    .post('', brandsHandler.create, {
        body: t.Object({
            name: t.String(),
        }),
        transform({ body }) {
            validateBody<IBrandCreateBody>(body, ['name']);
        },
    })
    .patch('/:id', brandsHandler.update, {
        params: t.Object({
            id: t.Number(),
        }),
        body: t.Object({
            name: t.Optional(t.String()),
        }),
        transform({ body }) {
            validateBody<IBrandUpdateBody>(body, ['name']);
        },
    })
    .delete('/:id', brandsHandler.delete, {
        params: t.Object({
            id: t.Number(),
        }),
    });
