import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const dbUser: string | undefined = process.env.DB_USER;
const dbPassword: string | undefined = process.env.DB_PASSWORD;
const dbName: string | undefined = process.env.DB_NAME;
const dbHost: string | undefined = process.env.DB_HOST;
const dbPort: string | undefined = process.env.DB_PORT;

const client = postgres(`postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`);

export const db = drizzle(client, { schema });
