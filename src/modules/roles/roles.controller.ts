import { Router, Request, Response, NextFunction } from 'express';
import validate from 'express-zod-safe';
import IController from '../shared/interfaces/controller.interface';
import * as validationSchemas from './roles.validations';
import * as RoleServices from './roles.services';
import { logger } from '../shared/logger';
import authenticate from '../shared/middlewares/authenticate';
import authorize from '../shared/middlewares/authorize';
import { PERMISSIONS } from '../shared/constants/permissions';

export default class RoleController implements IController {
  public readonly path = '/roles';
  public readonly router = Router();

  constructor() {
    this.initialiseRoutes();
  }

  public initialiseRoutes() {
    this.router.post(
      `${this.path}/`,
      validate(validationSchemas.createRoleSchema),
      authenticate,
      authorize.check(PERMISSIONS['tenants:roles:write']),
      this.createRole,
    );
  }

  public createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body.createdByUserId = crypto.randomUUID();
      const result = await RoleServices.createRole(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}
