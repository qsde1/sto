export function validateBody<T>(body: object, validKeyProps: Array<keyof T>) {
    for (const key of Object.keys(body) as Array<keyof T>) {
        (!validKeyProps.includes(key) || [undefined, null].includes(body[key])) && delete body[key];
    }
}
