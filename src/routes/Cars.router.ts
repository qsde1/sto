import { carsHandler } from '../handlers/index';

import Elysia, { t } from 'elysia';
import { ICarUpdateBody, ICarCreateBody } from '../handlers/types/Cars.handler';
import { arrayContained } from 'drizzle-orm';
import { validateBody } from '../services/bodyValidator';

export default new Elysia({ prefix: '/cars' })
    .get('', carsHandler.list)
    .get('/:id', carsHandler.getOne, {
        params: t.Object({
            id: t.Number(),
        }),
    })
    .post('', carsHandler.create, {
        body: t.Object({
            number: t.String(),
            vin: t.String(),
            color: t.String(),
        }),
        transform({ body }: ICarCreateBody) {
            const carCreateProps: Array<keyof ICarCreateBody> = ['color', 'number', 'vin'];
            validateBody<ICarCreateBody>(body, carCreateProps);
        },
    })
    .patch('/:id', carsHandler.update, {
        params: t.Object({ id: t.Number() }),
        body: t.Object({
            number: t.Optional(t.String()),
            vin: t.Optional(t.String()),
            color: t.Optional(t.String()),
            modelId: t.Optional(t.Number()),
        }),
        transform({ body }: { body: ICarUpdateBody }) {
            const carUpdateProps: Array<keyof ICarUpdateBody> = ['color', 'modelId', 'number', 'vin'];
            validateBody<ICarUpdateBody>(body, carUpdateProps);
        },
    })
    .delete('/:id', carsHandler.delete, { params: t.Object({ id: t.Number() }) });
