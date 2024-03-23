import IController from '../interfaces/controller.interface';
import TenantController from '../../tenants/tenants.controller';

const controllers: IController[] = [new TenantController()];

export default controllers;
