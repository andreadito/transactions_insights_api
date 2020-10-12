import { flatten } from 'ramda';

import fakeDB from '../fakeDB';
import { getInsights } from '../lib/insights';

export const list = (req, res) => {
  const { params } = req;
  const { customerId } = params;
  if (customerId) {
    const transactions = fakeDB.getTransactionsByCustomerId(customerId);
    if (transactions.length > 0) {
      const result = flatten(getInsights(transactions));
      res.json(result);
    } else {
      res.json([]);
    }
  } else {
    res.json([]);
  }
};
