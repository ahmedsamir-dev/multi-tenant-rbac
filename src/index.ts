import env from './modules/shared/env';
import App from './app';

const app = new App([], env.PORT);
app.listen();
