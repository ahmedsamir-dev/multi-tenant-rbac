import zod from 'zod';

const createUserSchema = {
  body: zod
    .object({
      name: zod
        .string({
          required_error: 'Name is required',
          invalid_type_error: 'Name must be a string',
        })
        .min(1),
      email: zod
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        })
        .email(),
      password: zod
        .string({
          required_error: 'Password is required',
          invalid_type_error: 'Password must be a string',
        })
        .min(6),
      tenantId: zod
        .string({
          required_error: 'TenantId is required',
          invalid_type_error: 'TenantId must be a string',
        })
        .uuid(),
      isInviteUserOperation: zod
        .boolean({
          invalid_type_error: 'isInviteUserOperation must be a boolean',
        })
        .default(false)
        .optional(),
    })
    .describe('Create User Schema'),
};

const loginUserSchema = {
  body: zod
    .object({
      email: zod
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        })
        .email(),
      password: zod
        .string({
          required_error: 'Password is required',
          invalid_type_error: 'Password must be a string',
        })
        .min(6),
    })
    .describe('Login User Schema'),
};

const assignRoleToUser = {
  body: zod
    .object({
      userId: zod
        .string({
          required_error: 'UserId is required',
          invalid_type_error: 'UserId must be a string',
        })
        .uuid(),
      roleId: zod
        .string({
          required_error: 'RoleId is required',
          invalid_type_error: 'RoleId must be a string',
        })
        .uuid(),
      tenantId: zod
        .string({
          required_error: 'TenantId is required',
          invalid_type_error: 'TenantId must be a string',
        })
        .uuid(),
    })
    .describe('Assign Role to User Schema'),
};

export { createUserSchema, loginUserSchema, assignRoleToUser };
