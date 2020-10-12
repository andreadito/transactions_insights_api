import { flatten } from 'ramda';

import fakeDB from '../fakeDB';
import insights from '../lib/insights';

export const list = (req, res) => {
  const { params } = req;
  const { customerId } = params;
  if (customerId) {
    const transactions = fakeDB.getTransactionsByCustomerId(customerId);
    if (transactions && transactions.length > 0) {
      const result = flatten(insights.getInsights(transactions));
      res.json(result);
    } else {
      res.json([]);
    }
  }
};
