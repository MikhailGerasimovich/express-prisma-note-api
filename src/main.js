import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { ServerConstants } from './common/constants/server.constants.js';
import { router } from './core/routers/routing.js';

dotenv.config();

async function bootstrap() {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(router);

  app.listen(ServerConstants.PORT, ServerConstants.HOST, () => {
    console.log(`server started successfully...`);
  });
}

bootstrap();
