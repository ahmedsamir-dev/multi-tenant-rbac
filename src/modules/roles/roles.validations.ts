import zod from 'zod';
import { TENANT_OWNER_PERMISSIONS } from '../shared/constants/permissions';

const createRoleSchema = {
  body: zod
    .object({
      name: zod
        .string({
          required_error: 'Name is required',
          invalid_type_error: 'Name must be a string',
        })
        .min(1),
      tenantId: zod
        .string({
          required_error: 'TenantId is required',
          invalid_type_error: 'TenantId must be a string',
        })
        .uuid(),

      permissions: zod
        .array(zod.enum(TENANT_OWNER_PERMISSIONS))
        .nonempty({
          message: 'Permissions is required',
        })
        .min(1),
    })
    .describe('Create Role Schema'),
};

export { createRoleSchema };
