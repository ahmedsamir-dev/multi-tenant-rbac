Multi Tenant Role Based Access Control in Express and Typescript
1. Users Can Register to a tenant which is here a generic name and can be a store or a merchant or so what.
2. User who owns the tenant can invite other users to his tenant.
3. Tenant owner can assign roles, permissions with scopes to users.
4. user may have many roles and permissions inside the tanent
5. so a user can have a tanent, can invite many users to his tenant, assign them roles with specific permissions to different modules and resources.
6. you can extend the codebase and create your modules baeed on your project business requirements 

Environment Setup:
1. Clone the rope on your machine.
2. Create a ```.env.prod``` file based on ```.env.example``` needed to setup the local services
3. Run the below command to start the product ready app
```docker-compose -f docker-compose.prod.yml up --build```
4- if you want a development suitable environment create a ```.env.dev``` then run 
```docker-compose -f docker-compose.dev.yml up --build```
