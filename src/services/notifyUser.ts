import type { IUser } from '../handlers/types/Users.handler';

const LOGIN = process.env.SMS_LOGIN;
const PASSWORD = process.env.SMS_PASSWORD;

export default async function ({
    message,
    userPhone,
}: {
    userPhone: IUser['phone'];
    message: string;
}): Promise<number | { error: string }> {
    const url = `https://auth.terasms.ru/outbox/send?login=${LOGIN}&password=${PASSWORD}&sender=terasms.ru&target=${userPhone}&message=${message}`;

    const response = await fetch(url);

    if (!response.ok) {
        console.log('ошибка');

        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        const data = await response.json();
        console.log(data);

        return data;
    }
}
