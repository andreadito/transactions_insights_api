import express from 'express';
import helmet from 'helmet';
import pino from 'pino';
import pinoHttp from 'pino-http';

import apiRoutes from './index.route';

const app = express();
const port = 3000;

const logger = pino({
  prettyPrint: {
    levelFirst: true,
    colorize: true,
  },
  useLevel: 'info',
});

const httpLogger = pinoHttp({
  logger: logger,
});

app.use(httpLogger);
app.use(helmet());
app.use('/api', apiRoutes);

app.listen(port);
