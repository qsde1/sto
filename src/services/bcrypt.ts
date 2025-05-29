import * as bcrypt from 'bcrypt';
const SALT = 10;

export function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT).then((hash) => hash);
}

export function comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash).then((result) => result);
}
