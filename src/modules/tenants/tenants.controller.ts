import { Router, Request, Response, NextFunction } from 'express';
import validate from 'express-zod-safe';
import IController from '../shared/interfaces/controller.interface';
import * as validationSchemas from './tenants.validations';
import * as TenantServices from './tenants.services';
import * as RoleServices from '../roles/roles.services';
import crypto from 'crypto';
import { logger } from '../shared/logger';
import { PERMISSIONS, TENANT_OWNER_ROLE } from '../shared/constants/permissions';
import authenticate from '../shared/middlewares/authenticate';
import authorize from '../shared/middlewares/authorize';

export default class TenantController implements IController {
  public readonly path = '/tenants';
  public readonly router = Router();

  constructor() {
    this.initialiseRoutes();
  }

  public initialiseRoutes() {
    this.router.get(`${this.path}/`, authenticate, authorize.check(PERMISSIONS['tenants:read']), this.getTenants);
    this.router.post(`${this.path}/`, authenticate, validate(validationSchemas.createTenantSchema), this.createTenant);
  }

  public getTenants = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await TenantServices.getTenants();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  public createTenant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //@ts-expect-error
      req.body.createdByUserId = req.user.id;
      const tenant = await TenantServices.createTenant(req.body);

      const tenantOwnerRole = await RoleServices.createRole({
        tenantId: tenant.id,
        name: TENANT_OWNER_ROLE.NAME,
        permissions: TENANT_OWNER_ROLE.PERMISSIONS as unknown as string[],
      });

      return res.status(201).json({ tenant, tenantOwnerRole });
    } catch (error) {
      logger.error(error);
      return res.status(500).json(error);
    }
  };
}
