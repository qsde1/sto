import Elysia, { t } from 'elysia';
import { worktypePartsHandler } from '../handlers';
import type { IWorktypePartCreateBody, IWorktypePartUpdateBody } from '../handlers/types/WorkTypePart.handler';
import { validateBody } from '../services/bodyValidator';

export default new Elysia({ prefix: '/worktype-parts' })
    .get('', worktypePartsHandler.list)
    .get('/:worktypeId/:partId', worktypePartsHandler.getOne, {
        params: t.Object({
            worktypeId: t.Number(),
            partId: t.Number(),
        }),
    })
    .get('/by-worktype/:worktypeId', worktypePartsHandler.getByWorktype, {
        params: t.Object({
            worktypeId: t.Number(),
        }),
    })
    .get('/by-part/:partId', worktypePartsHandler.getByPart, {
        params: t.Object({
            partId: t.Number(),
        }),
    })
    .post('', worktypePartsHandler.create, {
        body: t.Object({
            worktypeId: t.Number(),
            partId: t.Number(),
            quantity: t.Number(),
        }),
        beforeHandle: ({ body }) => {
            validateBody<IWorktypePartCreateBody>(body, ['worktypeId', 'partId', 'quantity']);
        },
    })
    .patch('/:worktypeId/:partId', worktypePartsHandler.update, {
        params: t.Object({
            worktypeId: t.Number(),
            partId: t.Number(),
        }),
        body: t.Object({
            quantity: t.Number(),
        }),
        beforeHandle: ({ body }) => {
            validateBody<IWorktypePartUpdateBody>(body, ['quantity']);
        },
    })
    .delete('/:worktypeId/:partId', worktypePartsHandler.delete, {
        params: t.Object({
            worktypeId: t.Number(),
            partId: t.Number(),
        }),
    });
