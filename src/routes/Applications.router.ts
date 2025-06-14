import { applicationsHandler } from '../handlers';
import Elysia, { t } from 'elysia';
import type { IApplicationCreateBody, IApplicationUpdateBody } from '../handlers/types/Applications.handler';
import { validateBody } from '../services/bodyValidator';

export default new Elysia({ prefix: '/applications' })
    .get('', applicationsHandler.list)
    .get('/:id', applicationsHandler.getOne, {
        params: t.Object({
            id: t.Number(),
        }),
    })
    .get('/by-car/:idCar', applicationsHandler.getByCar, {
        params: t.Object({
            idCar: t.Number(),
        }),
    })
    .get('/by-status/:idStatus', applicationsHandler.getByStatus, {
        params: t.Object({
            idStatus: t.Number(),
        }),
    })
    .get('/by-user/:idUser', applicationsHandler.getByUser, {
        params: t.Object({
            idUser: t.Number(),
        }),
    })
    .get('/by-box/:idBox', applicationsHandler.getByBox, {
        params: t.Object({
            idBox: t.Number(),
        }),
    })
    .post('', applicationsHandler.create, {
        body: t.Object({
            clientComment: t.Optional(t.String()),
            idCar: t.Number(),
            idStatus: t.Number(),
            idUser: t.Number(),
            idBox: t.Optional(t.Number()),
            price: t.Optional(t.Number()),
        }),
        transform({ body }) {
            validateBody<IApplicationCreateBody>(body, [
                'clientComment',
                'idCar',
                'idStatus',
                'idUser',
                'idBox',
                'price',
            ]);
        },
    })
    .patch('/:id', applicationsHandler.update, {
        params: t.Object({
            id: t.Number(),
        }),
        body: t.Object({
            clientComment: t.Optional(t.String()),
            idStatus: t.Optional(t.Number()),
            closeDate: t.Optional(t.String()),
            idBox: t.Optional(t.Number()),
            price: t.Optional(t.Number()),
        }),
        transform({ body }) {
            validateBody<IApplicationUpdateBody>(body, ['idStatus', 'clientComment', 'idBox', 'price', 'closeDate']);
        },
    })
    .delete('/:id', applicationsHandler.delete, {
        params: t.Object({
            id: t.Number(),
        }),
    });
