import {Router} from 'express';

import { list } from './insights.controller';

const router = Router();

router.route('/:customerId')
  .get(list)

export default router;
