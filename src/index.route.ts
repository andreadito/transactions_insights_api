import { Router } from 'express';

import insightsRoutes from './insights/insights.router';

const router = Router();

router.get('/health-check', (_req, res) =>
  res.send('OK')
);

router.use('/insights', insightsRoutes);

export default router;
