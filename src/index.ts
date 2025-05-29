import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';

import {
    carsRouter,
    rolesRouter,
    usersRouter,
    boxesRouter,
    statusesRouter,
    clientsRouter,
    suppliersRouter,
    partsRouter,
    workCategoriesRouter,
    workTypeRouter,
    worktypePartsRouter,
    clientsCarsRouter,
    modelsRouter,
    brandsRouter,
    applicationsRouter,
    worksRouter,
    partsWorksRouter,
} from './routes/index';

const app = new Elysia()
    .use(swagger())
    .use(carsRouter)
    .use(usersRouter)
    .use(rolesRouter)
    .use(boxesRouter)
    .use(statusesRouter)
    .use(clientsRouter)
    .use(suppliersRouter)
    .use(partsRouter)
    .use(workCategoriesRouter)
    .use(workTypeRouter)
    .use(worktypePartsRouter)
    .use(clientsCarsRouter)
    .use(modelsRouter)
    .use(brandsRouter)
    .use(applicationsRouter)
    .use(worksRouter)
    .use(partsWorksRouter);

app.listen(3000);
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
