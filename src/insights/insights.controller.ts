import { flatten } from 'ramda';

import fakeDB from '../fakeDB';
import insights from '../lib/insights';

export const list = (req, res) => {
  const { params, query } = req;
  const { customerId } = params;
  if (customerId) {
    const transactions = fakeDB.getTransactionsByCustomerId(customerId);
    if (transactions && transactions.length > 0) {
      const filters =
        query && query.insights ? query.insights.split(',') : null;
      const result = flatten(insights.getInsights(transactions, filters));
      res.json(result);
    } else {
      res.json([]);
    }
  }
};
