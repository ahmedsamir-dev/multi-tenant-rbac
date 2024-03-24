import { roles } from '../../orm/schema';
import database from '../../connections/postgre.connections';
import { InferInsertModel, eq, and } from 'drizzle-orm';

export const createRole = async (createRoleDto: InferInsertModel<typeof roles>) => {
  const result = await database.insert(roles).values(createRoleDto).returning();
  return result[0];
};

export const getRole = async (id: string) => {
  const result = await database.select().from(roles).where(eq(roles.id, id)).limit(1);
  return result[0];
};

export const getRoleByNameInTenant = async (name: string, tenantId: string) => {
  const result = await database
    .select()
    .from(roles)
    .where(and(eq(roles.name, name), eq(roles.tenantId, tenantId)))
    .limit(1);
  return result[0];
};
