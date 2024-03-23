import zod from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

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
      createdByUserId: zod.string().min(24).optional(),
    })
    .describe('Create Tenant Schema'),
};

const getTenantSchema = {
  body: {},
  query: {},
  params: zod
    .object({
      id: zod.string().min(24),
    })
    .describe('Get Tenant Schema'),
};

const deleteTenantSchema = {
  body: {},
  query: {},
  params: zod
    .object({
      id: zod.string().min(24),
    })
    .describe('Delete Tenant Schema'),
};

zodToJsonSchema(createTenantSchema.body, 'Create Tenant Schema');
zodToJsonSchema(getTenantSchema.params, 'Get Tenant Schema');
zodToJsonSchema(deleteTenantSchema.params, 'Delete Tenant Schema');

export { createTenantSchema, getTenantSchema, deleteTenantSchema };
