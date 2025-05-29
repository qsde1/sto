import { workCategoriesHandler } from '../handlers';
import Elysia, { t } from 'elysia';
import { IWorkCategoryCreateBody, IWorkCategoryUpdateBody } from '../handlers/types/WorkCategories.handler';
import { validateBody } from '../services/bodyValidator';

export default new Elysia({ prefix: '/work-categories' })
    .get('', workCategoriesHandler.list)
    .get('/:id', workCategoriesHandler.getOne, {
        params: t.Object({
            id: t.Number(),
        }),
    })
    .get('/by-name/:name', workCategoriesHandler.getByName, {
        params: t.Object({
            name: t.String(),
        }),
    })
    .post('', workCategoriesHandler.create, {
        body: t.Object({
            name: t.String(),
        }),
        transform({ body }) {
            validateBody<IWorkCategoryCreateBody>(body, ['name']);
        },
    })
    .patch('/:id', workCategoriesHandler.update, {
        params: t.Object({
            id: t.Number(),
        }),
        body: t.Object({
            name: t.Optional(t.String()),
        }),
        transform({ body }) {
            validateBody<IWorkCategoryUpdateBody>(body, ['name']);
        },
    })
    .delete('/:id', workCategoriesHandler.delete, {
        params: t.Object({
            id: t.Number(),
        }),
    });
