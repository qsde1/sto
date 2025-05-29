# Elysia with Bun runtime

## Начало работы

1. создать в корне проект .env фай с данными для кодключения к бд
   пример:

```env
DB_USER=postgres
DB_PASSWORD=1
DB_NAME=sto
DB_HOST=127.0.0.1
DB_PORT=5432
```

2. создать бд в постгресс
3. ввести в консоль:

```bash
bun i #установка зависимостей
bun drizzle-kit migrate #миграции в бд
bun run dev #запуск сервера в dev режиме
```
