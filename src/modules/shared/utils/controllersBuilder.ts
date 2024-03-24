import IController from '../interfaces/controller.interface';
import TenantController from '../../tenants/tenants.controller';
import UserController from '../../users-identity/users.controller';
const controllers: IController[] = [new TenantController(), new UserController()];

export default controllers;
