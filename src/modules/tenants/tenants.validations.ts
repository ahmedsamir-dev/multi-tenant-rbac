import zod from 'zod';

const createTenantSchema = {
  body: zod
    .object({
      name: zod
        .string({
          required_error: 'Name is required',
          invalid_type_error: 'Name must be a string',
        })
        .min(1),
      description: zod.string().optional(),
      createdByUserId: zod.string().uuid().optional(),
    })
    .describe('Create Tenant Schema'),
};

const getTenantSchema = {
  params: zod
    .object({
      id: zod.string().uuid(),
    })
    .describe('Get Tenant Schema'),
};

const deleteTenantSchema = {
  params: zod
    .object({
      id: zod.string().uuid(),
    })
    .describe('Delete Tenant Schema'),
};

export { createTenantSchema, getTenantSchema, deleteTenantSchema };
