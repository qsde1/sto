import { relations } from 'drizzle-orm';

import {
    integer,
    pgTable,
    varchar,
    doublePrecision,
    serial,
    boolean,
    primaryKey,
    bigint,
    text,
    numeric,
} from 'drizzle-orm/pg-core';

export const cars = pgTable('cars', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    number: varchar({ length: 100 }).notNull().unique(),
    year: varchar({ length: 100 }).notNull(),
    volumeEngine: doublePrecision().notNull(),
    vin: varchar().notNull().unique(),
    color: varchar({ length: 100 }).notNull(),
    type: varchar({ length: 100 }).notNull(),
    modelId: integer('model_id')
        .references(() => models.id)
        .notNull(),
});

export const carsRelations = relations(cars, ({ one, many }) => ({
    model: one(models, {
        fields: [cars.modelId],
        references: [models.id],
    }),
    applications: many(applications),
}));

export const roles = pgTable('roles', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
});

export const clients = pgTable('clients', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    email: varchar('email', { length: 100 }).notNull().unique(),
});

export const brands = pgTable('brands', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull().unique(),
});

export const models = pgTable('models', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    brandId: integer('brand_id')
        .references(() => brands.id)
        .notNull(),
});

export const brandsRelations = relations(brands, ({ many }) => ({
    models: many(models),
}));

export const modelsRelations = relations(models, ({ one, many }) => ({
    brand: one(brands, {
        fields: [models.brandId],
        references: [brands.id],
    }),
    cars: many(cars),
}));

export const statuses = pgTable('statuses', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull().unique(),
});

export const boxes = pgTable('boxes', {
    id: serial('id').primaryKey(),
    number: varchar('number', { length: 20 }).notNull().unique(),
    occupied: boolean('occupied').notNull().default(false),
});

export const clientsCars = pgTable(
    'clients_cars',
    {
        carId: integer('car_id')
            .notNull()
            .references(() => cars.id),
        clientId: integer('client_id')
            .notNull()
            .references(() => clients.id),
        createdAt: bigint('created_at', { mode: 'number' }).notNull(),
        archivedAt: bigint('archived_at', { mode: 'number' }),
    },
    (table) => [primaryKey({ columns: [table.clientId, table.carId] })]
);

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    login: varchar('login', { length: 50 }).notNull().unique(),
    password: text('password').notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    phone: varchar('phone', { length: 20 }).notNull().unique(),
    roleId: integer('role_id').references(() => roles.id),
});

export const usersRelations = relations(users, ({ one, many }) => ({
    role: one(roles, {
        fields: [users.roleId],
        references: [roles.id],
    }),
    applications: many(applications),
    works: many(works),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
    users: many(users),
}));

export const suppliers = pgTable('suppliers', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    contacts: varchar('contacts', { length: 255 }),
});

export const workCategories = pgTable('work_categories', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull().unique(),
});

export const workTypes = pgTable('work_types', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    price: doublePrecision('price').notNull(),
    categoryId: integer('category_id')
        .references(() => workCategories.id)
        .notNull(),
});

export const workTypesRelations = relations(workTypes, ({ one, many }) => ({
    category: one(workCategories, {
        fields: [workTypes.categoryId],
        references: [workCategories.id],
    }),
    works: many(works),
    parts: many(worktypeParts),
}));

export const workCategoriesRelations = relations(workCategories, ({ many }) => ({
    workTypes: many(workTypes),
}));

export const parts = pgTable('parts', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    price: doublePrecision('price').notNull(),
    idSuppliers: integer('supplier_id').references(() => suppliers.id),
    manufacturer: varchar('manufacturer', { length: 100 }),
    quantity: integer('quantity').notNull().default(0),
});

export const partsRelations = relations(parts, ({ one, many }) => ({
    supplier: one(suppliers, {
        fields: [parts.idSuppliers],
        references: [suppliers.id],
    }),
    works: many(partsWorks),
    workTypes: many(worktypeParts),
}));

export const suppliersRelations = relations(suppliers, ({ many }) => ({
    parts: many(parts),
}));

export const applications = pgTable('applications', {
    id: serial('id').primaryKey(),
    createdAt: bigint('created_at', { mode: 'number' }).notNull(),
    clientComment: text('client_comment'),
    idCar: integer('car_id')
        .notNull()
        .references(() => cars.id),
    idStatus: integer('status_id')
        .notNull()
        .references(() => statuses.id),
    idUser: integer('user_id')
        .notNull()
        .references(() => users.id),
    startDate: bigint('start_date', { mode: 'number' }).notNull(),
    closeDate: bigint('close_date', { mode: 'number' }),
    idBox: integer('box_id').references(() => boxes.id),
    price: numeric('price', { precision: 10, scale: 2 }),
});

export const applicationsRelations = relations(applications, ({ one, many }) => ({
    car: one(cars, {
        fields: [applications.idCar],
        references: [cars.id],
    }),
    status: one(statuses, {
        fields: [applications.idStatus],
        references: [statuses.id],
    }),
    user: one(users, {
        fields: [applications.idUser],
        references: [users.id],
    }),
    box: one(boxes, {
        fields: [applications.idBox],
        references: [boxes.id],
    }),
    works: many(works),
}));

export const statusesRelations = relations(statuses, ({ many }) => ({
    applications: many(applications),
}));

export const boxesRelations = relations(boxes, ({ many }) => ({
    applications: many(applications),
}));

export const works = pgTable('works', {
    id: serial('id').primaryKey(),
    idApplication: integer('application_id')
        .notNull()
        .references(() => applications.id),
    idUser: integer('user_id')
        .notNull()
        .references(() => users.id),
    idWorktype: integer('worktype_id')
        .notNull()
        .references(() => workTypes.id),
    startDate: bigint('start_date', { mode: 'number' }).notNull(),
    endDate: bigint('end_date', { mode: 'number' }),
    comments: text('comments'),
});

export const worksRelations = relations(works, ({ one, many }) => ({
    application: one(applications, {
        fields: [works.idApplication],
        references: [applications.id],
    }),
    user: one(users, {
        fields: [works.idUser],
        references: [users.id],
    }),
    workType: one(workTypes, {
        fields: [works.idWorktype],
        references: [workTypes.id],
    }),
    parts: many(partsWorks),
}));

export const partsWorks = pgTable(
    'parts_works',
    {
        workId: integer('work_id')
            .notNull()
            .references(() => works.id),
        partId: integer('part_id')
            .notNull()
            .references(() => parts.id),
        quantity: integer('quantity').notNull().default(1),
    },
    (table) => [primaryKey({ columns: [table.workId, table.partId] })]
);

export const partsWorksRelations = relations(partsWorks, ({ one }) => ({
    work: one(works, {
        fields: [partsWorks.workId],
        references: [works.id],
    }),
    part: one(parts, {
        fields: [partsWorks.partId],
        references: [parts.id],
    }),
}));

export const worktypeParts = pgTable(
    'worktype_parts',
    {
        worktypeId: integer('worktype_id')
            .notNull()
            .references(() => workTypes.id),
        partId: integer('part_id')
            .notNull()
            .references(() => parts.id),
        quantity: integer('quantity').notNull().default(1),
    },
    (table) => [primaryKey({ columns: [table.worktypeId, table.partId] })]
);

export const worktypePartsRelations = relations(worktypeParts, ({ one }) => ({
    workType: one(workTypes, {
        fields: [worktypeParts.worktypeId],
        references: [workTypes.id],
    }),
    part: one(parts, {
        fields: [worktypeParts.partId],
        references: [parts.id],
    }),
}));
