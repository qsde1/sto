import { partsHandler } from '../handlers';
import Elysia, { t } from 'elysia';
import { IPartCreateBody, IPartUpdateBody } from '../handlers/types/Parts.handler';
import { validateBody } from '../services/bodyValidator';

export default new Elysia({ prefix: '/parts' })
    .get('', partsHandler.list)
    .get('/:id', partsHandler.getOne, {
        params: t.Object({
            id: t.Number(),
        }),
    })
    .get('/by-name/:name', partsHandler.getByName, {
        params: t.Object({
            name: t.String(),
        }),
    })
    .get('/by-supplier/:supplierId', partsHandler.getBySupplier, {
        params: t.Object({
            supplierId: t.Number(),
        }),
    })
    .post('', partsHandler.create, {
        body: t.Object({
            name: t.String(),
            price: t.Number(),
            idSuppliers: t.Optional(t.Number()),
            manufacturer: t.Optional(t.String()),
            quantity: t.Optional(t.Number()),
        }),
        transform({ body }) {
            validateBody<IPartCreateBody>(body, ['name', 'price', 'idSuppliers', 'manufacturer', 'quantity']);
        },
    })
    .patch('/:id', partsHandler.update, {
        params: t.Object({
            id: t.Number(),
        }),
        body: t.Object({
            name: t.Optional(t.String()),
            price: t.Optional(t.Number()),
            idSuppliers: t.Optional(t.Number()),
            manufacturer: t.Optional(t.String()),
            quantity: t.Optional(t.Number()),
        }),
        transform({ body }) {
            validateBody<IPartUpdateBody>(body, ['name', 'price', 'idSuppliers', 'manufacturer', 'quantity']);
        },
    })
    .delete('/:id', partsHandler.delete, {
        params: t.Object({
            id: t.Number(),
        }),
    });
