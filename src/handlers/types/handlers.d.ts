import { type Context } from 'elysia';

interface IHandler {
    set: Context['set'];
}

interface IHandlerParams<P> extends IHandler {
    params: P;
}

interface IHandlerBody<B> extends IHandler {
    body: B;
}

interface IHandlerBodyParams<B, P> extends IHandler {
    body: B;
    params: P;
}

interface IHandlerCookie<C> extends IHandler {
    cookie: C;
}
