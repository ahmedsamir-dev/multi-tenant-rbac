import * as validationSchemas from './tenants.validations';
import * as zod from 'zod';

export type createTenantDto = zod.infer<typeof validationSchemas.createTenantSchema.body>;
export type getTenantDto = zod.infer<typeof validationSchemas.getTenantSchema.params>;
