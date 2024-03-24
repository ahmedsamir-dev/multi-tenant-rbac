import { Router, Request, Response, NextFunction } from 'express';
import IController from '../shared/interfaces/controller.interface';
import * as validationSchemas from './users.validations';
import * as UserServices from './users.services';
import validate from 'express-zod-safe';
import { logger } from '../shared/logger';
import {
  INVITED_USER_ROLE,
  TENANT_OWNER_PERMISSIONS,
  TENANT_OWNER_ROLE,
  PERMISSIONS,
} from '../shared/constants/permissions';
import { getRoleByNameInTenant } from '../roles/roles.services';
import authenticate from '../shared/middlewares/authenticate';
import authorize from '../shared/middlewares/authorize';

export default class UserController implements IController {
  public readonly path = '/users';
  public readonly router = Router();

  constructor() {
    this.initialiseRoutes();
  }

  initialiseRoutes() {
    this.router.use((req: Request, res: Response, next: NextFunction) => {
      next();
    });

    this.router.post(`${this.path}/`, validate(validationSchemas.createUserSchema), this.createUser);
    this.router.post(`${this.path}/login`, validate(validationSchemas.loginUserSchema), this.login);
    this.router.post(
      `${this.path}/assignRoleToUser`,
      authenticate,
      authorize.check(PERMISSIONS['tenants:users:role:write']),
      validate(validationSchemas.loginUserSchema),
      this.login,
    );
  }

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let roleName = INVITED_USER_ROLE.NAME;
      if (!req.body.isInviteUserOperation) {
        roleName = TENANT_OWNER_ROLE.NAME;
        const tenantUsers = await UserServices.getAllUsersByTenant(req.body.tenantId);
        if (tenantUsers.length) {
          return res.status(400).json({ message: `Tenant ${req.body.tenantId} already has ${roleName} role` });
        }
      }

      const role = await getRoleByNameInTenant(roleName, req.body.tenantId);

      const user = await UserServices.createUser(req.body);
      await UserServices.assignRoleToUser({
        userId: req.body.id,
        roleId: role.id,
        tenantId: req.body.tenantId,
      });

      return res.status(201).json({ user });
    } catch (error) {
      logger.info(error);
      return res.status(500).json(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await UserServices.login(req.body);

      return res.status(200).json({ token });
    } catch (error) {
      logger.info(error);
      return res.status(500).json(error);
    }
  };

  public assignRoleToUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UserServices.assignRoleToUser(req.body);
      return res.status(201).json(result);
    } catch (error) {
      logger.info(error);
      return res.status(500).json(error);
    }
  };
}
