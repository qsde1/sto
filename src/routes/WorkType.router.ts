import { workTypesHandler } from '../handlers';
import Elysia, { t } from 'elysia';
import { IWorkTypeCreateBody, IWorkTypeUpdateBody } from '../handlers/types/WorkTypes.handler';
import { validateBody } from '../services/bodyValidator';

export default new Elysia({ prefix: '/work-types' })
    .get('', workTypesHandler.list)
    .get('/:id', workTypesHandler.getOne, {
        params: t.Object({
            id: t.Number(),
        }),
    })
    .get('/by-name/:name', workTypesHandler.getByName, {
        params: t.Object({
            name: t.String(),
        }),
    })
    .get('/by-category/:categoryId', workTypesHandler.getByCategory, {
        params: t.Object({
            categoryId: t.Number(),
        }),
    })
    .post('', workTypesHandler.create, {
        body: t.Object({
            name: t.String(),
            price: t.Number(),
            categoryId: t.Number(),
        }),
        transform({ body }) {
            validateBody<IWorkTypeCreateBody>(body, ['name', 'price', 'categoryId']);
        },
    })
    .patch('/:id', workTypesHandler.update, {
        params: t.Object({
            id: t.Number(),
        }),
        body: t.Object({
            name: t.Optional(t.String()),
            price: t.Optional(t.Number()),
            categoryId: t.Optional(t.Number()),
        }),
        transform({ body }) {
            validateBody<IWorkTypeUpdateBody>(body, ['name', 'price', 'categoryId']);
        },
    })
    .delete('/:id', workTypesHandler.delete, {
        params: t.Object({
            id: t.Number(),
        }),
    });
