import { clientsHandler } from '../handlers';
import Elysia, { t } from 'elysia';
import { IClientCreateBody, IClientUpdateBody } from '../handlers/types/Clients.handler';
import { validateBody } from '../services/bodyValidator';

export default new Elysia({ prefix: '/clients' })
    .get('', clientsHandler.list)
    .get('/:id', clientsHandler.getOne, {
        params: t.Object({
            id: t.Number(),
        }),
    })
    .get('/by-phone/:phone', clientsHandler.getByPhone, {
        params: t.Object({
            phone: t.String(),
        }),
    })
    .get('/by-email/:email', clientsHandler.getByEmail, {
        params: t.Object({
            email: t.String(),
        }),
    })
    .post('', clientsHandler.create, {
        body: t.Object({
            name: t.String(),
            phone: t.String(),
            email: t.String(),
        }),
        transform({ body }) {
            validateBody<IClientCreateBody>(body, ['name', 'phone', 'email']);
        },
    })
    .patch('/:id', clientsHandler.update, {
        params: t.Object({
            id: t.Number(),
        }),
        body: t.Object({
            name: t.Optional(t.String()),
            phone: t.Optional(t.String()),
            email: t.Optional(t.String()),
        }),
        transform({ body }) {
            validateBody<IClientUpdateBody>(body, ['name', 'phone', 'email']);
        },
    })
    .delete('/:id', clientsHandler.delete, {
        params: t.Object({
            id: t.Number(),
        }),
    });
