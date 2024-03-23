import { Router, Request, Response, NextFunction } from 'express';
import validate from 'express-zod-safe';
import IController from '../shared/interfaces/controller.interface';
import * as validationSchemas from './tenants.validations';
import * as TenantServices from './tenants.services';
import crypto from 'crypto';
import { logger } from '../shared/logger';

export default class TenantController implements IController {
  public readonly path = '/tenants';
  public readonly router = Router();

  constructor() {
    this.initialiseRoutes();
  }

  public initialiseRoutes() {
    this.router.get(`${this.path}/`, this.getTenants);
    this.router.post(`${this.path}/`, validate(validationSchemas.createTenantSchema), this.createTenant);
    this.router.route('/:id').get(this.getTenant).put(this.updateTenant).delete(this.deleteTenant);
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
      req.body.createdByUserId = crypto.randomUUID();
      logger.info(req.body);
      const result = await TenantServices.createTenant(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  public getTenant = async (req: Request, res: Response, next: NextFunction) => {
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
