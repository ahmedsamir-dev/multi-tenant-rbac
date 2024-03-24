import guard from 'express-jwt-permissions';

const authorizeMiddleware = guard({ requestProperty: 'user', permissionsProperty: 'permissions' });

export default authorizeMiddleware;
