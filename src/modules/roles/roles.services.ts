import { roles } from '../../orm/schema';
import database from '../../connections/postgre.connections';
import { InferInsertModel } from 'drizzle-orm';

export const createRole = async (createRoleDto: InferInsertModel<typeof roles>) => {
  const result = await database.insert(roles).values(createRoleDto).returning();
  return result[0];
};
