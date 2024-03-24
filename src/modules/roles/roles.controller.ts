import { Router, Request, Response, NextFunction } from 'express';
import validate from 'express-zod-safe';
import IController from '../shared/interfaces/controller.interface';
// import * as validationSchemas from './roles.validations';
import * as RoleServices from './roles.services';
import { logger } from '../shared/logger';

export default class RoleController implements IController {
  public readonly path = '/roles';
  public readonly router = Router();

  constructor() {
    this.initialiseRoutes();
  }

  public initialiseRoutes() {
    this.router.get(`${this.path}/`, this.getRoles);
    this.router.post(`${this.path}/`, validate(validationSchemas.createRoleSchema), this.createRole);
    this.router.route('/:id').get(this.getRole).put(this.updateRole).delete(this.deleteRole);
  }

  public getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await RoleServices.getRoles();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  public createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body.createdByUserId = crypto.randomUUID();
      logger.info(req.body);
      const result = await RoleServices.createRole(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  public getRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json();
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  public updateTenant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json();
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  public deleteTenant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}
