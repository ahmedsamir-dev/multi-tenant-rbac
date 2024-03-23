import { tenants } from '../../orm/schema';
import database from '../../connections/postgre.connections';
import { InferInsertModel } from 'drizzle-orm';

export const createTenant = async (createTenantDto: InferInsertModel<typeof tenants>) => {
  const result = await database.insert(tenants).values(createTenantDto).returning();

  return result[0];
};

export const getTenants = async () => {
  const result = await database
    .select({
      id: tenants.id,
      name: tenants.name,
      createdAt: tenants.createdAt,
    })
    .from(tenants);
  return result;
};
