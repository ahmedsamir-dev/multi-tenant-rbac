import { expressjwt as authenticate } from 'express-jwt';
import env from '../env';

const authenticateMiddleware = authenticate({ secret: env.JWT_SECRET, algorithms: ['HS256'], requestProperty: 'user' });

export default authenticateMiddleware;
