import { roles, userRolesTenants, users } from '../../orm/schema';
import database from '../../connections/postgre.connections';
import { InferInsertModel, eq, and } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { logger } from '../shared/logger';

export const createUser = async (createUserDto: InferInsertModel<typeof users>) => {
  try {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    const result = await database.insert(users).values(createUserDto).returning({
      id: users.id,
      name: users.name,
      email: users.email,
      tenantId: users.tenantId,
      createdAt: users.createdAt,
    });
    return result[0];
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const getAllUsersByTenant = async (tenantId: string) => {
  try {
    const result = await database.select({ id: users.id }).from(users).where(eq(users.tenantId, tenantId));
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const assignRoleToUser = async (assignRoleToUserDto: InferInsertModel<typeof userRolesTenants>) => {
  return await database.insert(userRolesTenants).values(assignRoleToUserDto).returning()[0];
};

export const getUserByEmail = async (email: string, tenantId: string) => {
  const result = await database
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      password: users.password,
      tenantId: users.tenantId,
      roleId: roles.id,
      permissions: roles.permissions,
    })
    .from(users)
    .where(and(eq(users.email, email), eq(users.tenantId, tenantId)))
    .leftJoin(userRolesTenants, and(eq(userRolesTenants.userId, users.id), eq(userRolesTenants.tenantId, tenantId)))
    .leftJoin(roles, eq(roles.id, userRolesTenants.roleId));

  if (result.length === 0) {
    return null;
  }

  const user = result.reduce(
    (acc, curr) => {
      if (!acc.id) {
        return {
          ...curr,
          permissions: new Set(curr.permissions),
        };
      }

      if (!curr.permissions) {
        return acc;
      }

      for (const permission of curr.permissions) {
        acc.permissions.add(permission);
      }

      return acc;
    },
    {} as Omit<(typeof result)[number], 'permissions'> & { permissions: Set<string> },
  );

  return {
    ...user,
    permissions: Array.from(user.permissions),
  };
};

export const login = async (loginDto: Pick<InferInsertModel<typeof users>, 'email' | 'password' | 'tenantId'>) => {
  try {
    const user = await getUserByEmail(loginDto.email, loginDto.tenantId);

    if (user) {
      const isPasswordValid = await checkPassword(loginDto.password, user[0].password);
      if (isPasswordValid) {
        return signJWT(user);
      }
    }

    return;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const signJWT = (payload: { id: string; email: string; tenantId: string; permissions: string[] }) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const checkPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};
