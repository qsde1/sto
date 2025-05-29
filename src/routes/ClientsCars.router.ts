import { clientsCarsHandler } from '../handlers';
import Elysia, { t } from 'elysia';
import { IClientCarCreateBody, IClientCarUpdateBody } from '../handlers/types/ClientsCars.handler';
import { validateBody } from '../services/bodyValidator';

export default new Elysia({ prefix: '/clients-cars' })
    .get('', clientsCarsHandler.list)
    .get('/:clientId/:carId', clientsCarsHandler.getOne, {
        params: t.Object({
            clientId: t.Number(),
            carId: t.Number(),
        }),
    })
    .get('/by-client/:clientId', clientsCarsHandler.getByClient, {
        params: t.Object({
            clientId: t.Number(),
        }),
    })
    .get('/by-car/:carId', clientsCarsHandler.getByCar, {
        params: t.Object({
            carId: t.Number(),
        }),
    })
    .post('', clientsCarsHandler.create, {
        body: t.Object({
            clientId: t.Number(),
            carId: t.Number(),
        }),
        transform({ body }) {
            validateBody<IClientCarCreateBody>(body, ['clientId', 'carId']);
        },
    })
    .patch('/:clientId/:carId', clientsCarsHandler.update, {
        params: t.Object({
            clientId: t.Number(),
            carId: t.Number(),
        }),
        body: t.Object({
            archivedAt: t.Optional(t.String()),
        }),
        transform({ body }) {
            validateBody<IClientCarUpdateBody>(body, ['archivedAt']);
        },
    })
    .delete('/:clientId/:carId', clientsCarsHandler.delete, {
        params: t.Object({
            clientId: t.Number(),
            carId: t.Number(),
        }),
    });
