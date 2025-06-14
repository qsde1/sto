import type { Context } from 'elysia';

export type IHandler = {
    set: Context['set'];
}

export type IHandlerParams<P> = IHandler & {
    params: P;
}

export type IHandlerBody<B> = IHandler & {
    body: B;
}

export type IHandlerBodyParams<B, P> = IHandler & {
    body: B;
    params: P;
}

export type IHandlerCookie<C> = IHandler & {
    cookie: C;
}
