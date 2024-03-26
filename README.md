# Multi-Tenant Role-Based Access Control in Express and TypeScript

This project facilitates a robust Multi-Tenant Role-Based Access Control system using Express and TypeScript. Here's a breakdown of its key functionalities:

1. **User Registration to Tenants**: Users can register to a tenant, which can represent various entities such as a store, a merchant, or any other applicable entity.

2. **Tenant Owner Privileges**: Owners of a tenant have the authority to invite other users to join their tenant.

3. **Role and Permission Assignment**: Tenant owners possess the ability to assign roles and permissions, including specific scopes, to users within their tenant.

4. **Flexible User Role Configuration**: Users can be assigned multiple roles and permissions within a tenant, granting them varying degrees of access to different modules and resources.

5. **Scalability and Customization**: The codebase is designed to be easily extendable, allowing for the creation of custom modules tailored to specific project business requirements.

## Environment Setup:

To set up the environment for this project, follow these steps:

1. Clone the repository to your local machine.

2. Create a `.env.prod` file based on the provided `.env.example`. This file contains essential configurations for setting up local services.

3. Ensure that the environment variables are correctly configured, as there is a validation layer in place. Incorrect configurations may lead to application crashes.

4. Start the production-ready application by running the following command:
   - production
     ```sh
     docker-compose -f docker-compose.prod.yml up --build
   - development: 
      For a development environment, create a `.env.dev` file and run:
      ```sh
      docker-compose -f docker-compose.dev.yml up --build
5- To facilitate API testing and view API signatures, import the thundr.client.json file into the Thunder Client extension for Visual Studio Code.

## Technologies Used:

This project leverages the following technologies:

- [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/): For server-side development.
- [TypeScript](https://www.typescriptlang.org/): To enhance code readability and maintainability.
- [PostgreSQL](https://www.postgresql.org/): As the database management system.
- [Drizzle ORM](https://github.com/GeX4Drizzle/drizzle): For object-relational mapping.
- [JWT Authentication](https://jwt.io/): For secure user authentication.
- [Pino](https://github.com/pinojs/pino): A logging library for Node.js applications.
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/): For containerization and orchestration.
- [Zod](https://github.com/colinhacks/zod): A TypeScript-first schema declaration and validation library.
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js): For password hashing.
- [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/): For code formatting and linting.
- [Lefthook](https://github.com/Arkweid/lefthook): A Git hooks manager.

## Documentation
For more detailed documentation, refer to the [Project Documentation](https://ahmed-samir.gitbook.io/multi-tenant-rbac-project-documentation/).

The documentation provides detailed insights into the architecture, modules, and instructions on extending the project based on your specific project requirements.

