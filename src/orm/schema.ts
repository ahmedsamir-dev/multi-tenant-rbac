import { pgTable, uuid, varchar, timestamp, text, primaryKey, uniqueIndex } from 'drizzle-orm/pg-core';

export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  description: varchar('description', { length: 200 }),
  createdByUserId: uuid('createdByUserId')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  email: varchar('email', { length: 200 }).notNull().unique(),
  password: varchar('password', { length: 100 }).notNull(),
  tenantId: uuid('tenantId').references(() => tenants.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const roles = pgTable(
  'roles',
  {
    id: uuid('id').defaultRandom(),
    name: varchar('name', { length: 200 }).notNull(),
    tenantId: uuid('applicationId')
      .notNull()
      .references(() => tenants.id),
    permissions: text('permissions').notNull().array().$type<Array<string>>(),
    description: varchar('description', { length: 200 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (roles) => {
    return {
      cpk: primaryKey({ columns: [roles.name, roles.tenantId] }),
      uniqueIdIndex: uniqueIndex('roles_unique_id_index').on(roles.id),
    };
  },
);

export const userRolesTenants = pgTable(
  'user_roles_tenants',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => users.id),
    roleId: uuid('roleId')
      .notNull()
      .references(() => roles.id),
    tenantId: uuid('tenantId')
      .notNull()
      .references(() => tenants.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (userRolesTenants) => {
    return {
      cpk: primaryKey({ columns: [userRolesTenants.userId, userRolesTenants.roleId, userRolesTenants.tenantId] }),
    };
  },
);
