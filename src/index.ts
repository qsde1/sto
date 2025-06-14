import { Elysia } from 'elysia';
import { applicationsRouter,  carsRouter, clientsRouter, clientsCarsRouter, rolesRouter, usersRouter, workCategoriesRouter, workTypeRouter, worktypePartsRouter, brandsRouter, modelsRouter, partsRouter, partsWorksRouter, suppliersRouter, boxesRouter, statusesRouter } from './routes/index';

const app = new Elysia()
    .use(applicationsRouter)
    .use(carsRouter)
    .use(clientsRouter)
    .use(clientsCarsRouter)
    .use(rolesRouter)
    .use(usersRouter)
    .use(workCategoriesRouter)
    .use(workTypeRouter)
    .use(worktypePartsRouter)
    .use(brandsRouter)
    .use(modelsRouter)
    .use(partsRouter)
    .use(partsWorksRouter)
    .use(suppliersRouter)
    .use(boxesRouter)
    .use(statusesRouter)
    .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

