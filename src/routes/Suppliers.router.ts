import { suppliersHandler } from '../handlers/index';
import Elysia, { t } from 'elysia';
import { ISupplierCreateBody, ISupplierUpdateBody } from '../handlers/types/Suppliers.handler';
import { validateBody } from '../services/bodyValidator';

export default new Elysia({ prefix: '/suppliers' })
    .get('', suppliersHandler.list)
    .get('/:id', suppliersHandler.getOne, {
        params: t.Object({
            id: t.Number(),
        }),
    })
    .get('/by-name/:name', suppliersHandler.getByName, {
        params: t.Object({
            name: t.String(),
        }),
    })
    .post('', suppliersHandler.create, {
        body: t.Object({
            name: t.String(),
            contacts: t.Optional(t.String()),
        }),
        transform({ body }) {
            validateBody<ISupplierCreateBody>(body, ['name', 'contacts']);
        },
    })
    .patch('/:id', suppliersHandler.update, {
        params: t.Object({
            id: t.Number(),
        }),
        body: t.Object({
            name: t.Optional(t.String()),
            contacts: t.Optional(t.String()),
        }),
        transform({ body }) {
            validateBody<ISupplierUpdateBody>(body, ['name', 'contacts']);
        },
    })
    .delete('/:id', suppliersHandler.delete, {
        params: t.Object({
            id: t.Number(),
        }),
    });
