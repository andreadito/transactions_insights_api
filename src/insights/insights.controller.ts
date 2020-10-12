import { flatten } from 'ramda';

import fakeDB from '../fakeDB';
import insights from '../lib/insights';

export const extractInsightFiltersFromQuery = (query): string[] | null => {
  return query && query.insights ? query.insights.split(',') : null;
};

export const list = (req, res) => {
  const { params, query } = req;
  const { customerId } = params;
  if (customerId) {
    const transactions = fakeDB.getTransactionsByCustomerId(customerId);
    if (transactions && transactions.length > 0) {
      const filters = extractInsightFiltersFromQuery(query);
      const results = flatten(insights.getInsights(transactions, filters));
      res.json(results);
    } else {
      res.json([]);
    }
  }
};
