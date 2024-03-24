export const TENANT_OWNER_PERMISSIONS = [
  'tenants:read',
  'tenants:write',
  'tenants:update',
  'tenants:delete',
  'tenants:users:read',
  'tenants:users:role:read',
  'tenants:users:role:write',
  'tenants:users:role:update',
  'tenants:users:role:delete',

  //other resources like products, products categories, etc
  'products:read',
  'products:write',
  'products:update',
  'products:delete',
  'products:categories:read',
  'products:categories:write',
  'products:categories:update',
  'products:categories:delete',

  //we can add scopes also, like but not handled now
  'products:own:read',
  'products:any:write',
  'products:own:update',
  'products:own:delete',
];

export const PERMISSIONS = TENANT_OWNER_PERMISSIONS.reduce(
  (acc, permission) => {
    acc[permission] = permission;

    return acc;
  },
  {} as Record<(typeof TENANT_OWNER_PERMISSIONS)[number], (typeof TENANT_OWNER_PERMISSIONS)[number]>,
);

export const TENANT_OWNER_ROLE = {
  NAME: 'TENANT_OWNER',
  PERMISSIONS: TENANT_OWNER_PERMISSIONS,
};
