import { worksHandler } from '../handlers';
import Elysia, { t } from 'elysia';
import { IWorkCreateBody, IWorkUpdateBody } from '../handlers/types/Works.handler';
import { validateBody } from '../services/bodyValidator';

export default new Elysia({ prefix: '/works' })
    .get('', worksHandler.list)
    .get('/:id', worksHandler.getOne, {
        params: t.Object({
            id: t.Number(),
        }),
    })
    .get('/by-application/:idApplication', worksHandler.getByApplication, {
        params: t.Object({
            idApplication: t.Number(),
        }),
    })
    .get('/by-user/:idUser', worksHandler.getByUser, {
        params: t.Object({
            idUser: t.Number(),
        }),
    })
    .get('/by-worktype/:idWorktype', worksHandler.getByWorktype, {
        params: t.Object({
            idWorktype: t.Number(),
        }),
    })
    .post('', worksHandler.create, {
        body: t.Object({
            idApplication: t.Number(),
            idUser: t.Number(),
            idWorktype: t.Number(),
            endDate: t.Optional(t.String()),
            comments: t.Optional(t.String()),
        }),
        transform({ body }) {
            validateBody<IWorkCreateBody>(body, ['idApplication', 'idUser', 'idWorktype', 'endDate', 'comments']);
        },
    })
    .patch('/:id', worksHandler.update, {
        params: t.Object({
            id: t.Number(),
        }),
        body: t.Object({
            idUser: t.Optional(t.Number()),
            endDate: t.Optional(t.String()),
            comments: t.Optional(t.String()),
        }),
        transform({ body }) {
            validateBody<IWorkUpdateBody>(body, ['idUser', 'endDate', 'comments']);
        },
    })
    .delete('/:id', worksHandler.delete, {
        params: t.Object({
            id: t.Number(),
        }),
    });
