import { partsWorksHandler } from '../handlers';
import Elysia, { t } from 'elysia';
import { IPartWorkCreateBody, IPartWorkUpdateBody } from '../handlers/types/PartsWorks.handler';
import { validateBody } from '../services/bodyValidator';

export default new Elysia({ prefix: '/parts-works' })
    .get('', partsWorksHandler.list)
    .get('/:workId/:partId', partsWorksHandler.getOne, {
        params: t.Object({
            workId: t.Number(),
            partId: t.Number(),
        }),
    })
    .get('/by-work/:workId', partsWorksHandler.getByWork, {
        params: t.Object({
            workId: t.Number(),
        }),
    })
    .get('/by-part/:partId', partsWorksHandler.getByPart, {
        params: t.Object({
            partId: t.Number(),
        }),
    })
    .post('', partsWorksHandler.create, {
        body: t.Object({
            workId: t.Number(),
            partId: t.Number(),
            quantity: t.Number(),
        }),
        transform({ body }) {
            validateBody<IPartWorkCreateBody>(body, ['workId', 'partId', 'quantity']);
        },
    })
    .patch('/:workId/:partId', partsWorksHandler.update, {
        params: t.Object({
            workId: t.Number(),
            partId: t.Number(),
        }),
        body: t.Object({
            quantity: t.Optional(t.Number()),
        }),
        transform({ body }) {
            validateBody<IPartWorkUpdateBody>(body, ['quantity']);
        },
    })
    .delete('/:workId/:partId', partsWorksHandler.delete, {
        params: t.Object({
            workId: t.Number(),
            partId: t.Number(),
        }),
    });
