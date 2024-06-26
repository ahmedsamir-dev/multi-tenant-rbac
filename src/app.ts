import express, { Application, query } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { logger } from './modules/shared/logger';
import IController from './modules/shared/interfaces/controller.interface';
// import errorMiddleware from '@/shared/middlewares/error.middleware'

/**
 * App Class: Bootstrap our server and intialise all required steps to start the server
 */
export default class App {
  private express: Application;
  private port: number;

  constructor(controllers: IController[], port: number) {
    this.express = express();
    this.port = port;

    this.initialiseMiddlewares();
    this.initialiseControllers(controllers);
    // this.intialiseErrorHandling()
  }

  /**
   * method used for intialising all global middlewares
   */
  private initialiseMiddlewares() {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(compression());
    this.express.use(
      pinoHttp({
        quietReqLogger: true, // turn off the default logging output
        transport: {
          target: 'pino-http-print', // use the pino-http-print transport and its formatting output
          options: {
            destination: 1,
            all: true,
            translateTime: true,
          },
        },
      }),
    );
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
  }

  /**
   * Intialise all the controllers by looping through the routers of each controller and passes it to express
   * @param controllers - Array of controllers for all modules
   */
  private initialiseControllers(controllers: IController[]) {
    controllers.forEach((controller: IController) => {
      this.express.use('/api/v1', controller.router);
    });

    logger.info(this.express);
  }

  /**
   * Intialise express global error handling middleware, Accepts HttpExecption from controllers and response it to the client side
   */
  // private intialiseErrorHandling() {
  //   this.express.use(errorMiddleware)
  // }

  /**
   * Start listening the express server on the predefined port
   */
  public listen() {
    this.express.listen(this.port, () => {
      logger.info(`App running on port: ${this.port}`);
    });
  }
}
