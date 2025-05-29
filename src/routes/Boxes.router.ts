import { boxesHandler } from '../handlers/index';
import Elysia, { t } from 'elysia';
import { IBoxCreateBody, IBoxUpdateBody } from '../handlers/types/Boxes.handler';
import { validateBody } from '../services/bodyValidator';

export default new Elysia({ prefix: '/boxes' })
    .get('', boxesHandler.list)
    .get('/:id', boxesHandler.getOne, {
        params: t.Object({
            id: t.Number(),
        }),
    })
    .get('/by-number/:number', boxesHandler.getByNumber, {
        params: t.Object({
            number: t.String(),
        }),
    })
    .post('', boxesHandler.create, {
        body: t.Object({
            number: t.String(),
            occupied: t.Boolean(),
        }),
        transform({ body }: { body: IBoxCreateBody }) {
            const boxCreateProps: Array<keyof IBoxCreateBody> = ['number', 'occupied'];
            validateBody<IBoxCreateBody>(body, boxCreateProps);
        },
    })
    .patch('/:id', boxesHandler.update, {
        params: t.Object({ id: t.Number() }),
        body: t.Object({
            number: t.Optional(t.String()),
            occupied: t.Optional(t.Boolean()),
        }),
        transform({ body }: { body: IBoxUpdateBody }) {
            const boxUpdateProps: Array<keyof IBoxUpdateBody> = ['number', 'occupied'];
            validateBody<IBoxUpdateBody>(body, boxUpdateProps);
        },
    })
    .delete('/:id', boxesHandler.delete, {
        params: t.Object({ id: t.Number() }),
    });
