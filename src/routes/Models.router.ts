import { modelsHandler } from '../handlers';
import Elysia, { t } from 'elysia';
import { IModelCreateBody, IModelUpdateBody } from '../handlers/types/Models.handler';
import { validateBody } from '../services/bodyValidator';

export default new Elysia({ prefix: '/models' })
    .get('', modelsHandler.list)
    .get('/:id', modelsHandler.getOne, {
        params: t.Object({
            id: t.Number(),
        }),
    })
    .get('/by-name/:name', modelsHandler.getByName, {
        params: t.Object({
            name: t.String(),
        }),
    })
    .get('/by-brand/:brandId', modelsHandler.getByBrand, {
        params: t.Object({
            brandId: t.Number(),
        }),
    })
    .post('', modelsHandler.create, {
        body: t.Object({
            name: t.String(),
            brandId: t.Number(),
        }),
        transform({ body }) {
            validateBody<IModelCreateBody>(body, ['name', 'brandId']);
        },
    })
    .patch('/:id', modelsHandler.update, {
        params: t.Object({
            id: t.Number(),
        }),
        body: t.Object({
            name: t.Optional(t.String()),
            brandId: t.Optional(t.Number()),
        }),
        transform({ body }) {
            validateBody<IModelUpdateBody>(body, ['name', 'brandId']);
        },
    })
    .delete('/:id', modelsHandler.delete, {
        params: t.Object({
            id: t.Number(),
        }),
    });
