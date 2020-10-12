import { getMonth, isThisMonth, subMonths } from 'date-fns';
import { filter, groupBy, map, pipe, prop } from 'ramda';

import { Transaction } from '../fakeDB';

const allAvailableInsights = [
  'incomeAndOutgoings',
  'spendByCategory',
  'spendingComparison',
];

const byCategory = pipe(
  groupBy((element: Transaction) => element.category),
  map(filter(({ type }) => type === 'out'))
);

const byType = pipe(groupBy(prop('type')));

function getSpendingByCategory(transactions: Transaction[]) {
  const results = [];
  if (!transactions) return results;

  const grouped = byCategory(
    transactions.filter((transaction) =>
      isThisMonth(Date.parse(transaction.date))
    )
  );

  for (const key in grouped) {
    if (grouped.hasOwnProperty(key)) {
      const total =
        grouped[key] &&
        grouped[key].reduce(
          (acc, transaction) => (acc += transaction.amount),
          0
        );
      results.push({
        type: 'spendByCategory',
        message: `You've spent ${total.toFixed(2)} £ at ${key} this month`,
      });
    }
  }

  return results;
}

function getSpendingComparison(transactions: Transaction[]) {
  if (!transactions || !(transactions.length > 0)) return [];

  const thisMonth = byType(
    transactions.filter((transaction) =>
      isThisMonth(Date.parse(transaction.date))
    )
  );
  const lastMonth = byType(
    transactions.filter(
      (transaction) =>
        getMonth(Date.parse(transaction.date)) ===
        getMonth(subMonths(new Date(), 1))
    )
  );

  const thisMonthSpending = thisMonth['out']
    ? thisMonth['out'].reduce((acc, transaction) => {
        return (acc += transaction.amount);
      }, 0)
    : 0;

  const lastMonthSpending = lastMonth['out']
    ? lastMonth['out'].reduce((acc, transaction) => {
        return (acc += transaction.amount);
      }, 0)
    : 0;

  const diff = 100 - (thisMonthSpending * 100) / lastMonthSpending;

  return [
    {
      type: 'spendingComparison',
      message: `You've spent ${
        diff > 0
          ? `${Math.abs(diff).toFixed(2)}% less`
          : `${Math.abs(diff).toFixed(2)}% more`
      } the previous month!`,
    },
  ];
}

function getIncomeAndOutgoings(transactions: Transaction[]) {
  if (!transactions) return [];
  const grouped = byType(
    transactions.filter((transaction) =>
      isThisMonth(Date.parse(transaction.date))
    )
  );
  if (Object.entries(grouped).length > 0) {
    const income =
      grouped['in'] &&
      grouped['in'].reduce((acc, { amount }: Transaction) => {
        return (acc += amount);
      }, 0);

    const outgoings =
      grouped['out'] &&
      grouped['out'].reduce((acc, { amount }: Transaction) => {
        return (acc += amount);
      }, 0);

    return [
      {
        type: 'incomeAndOutgoings',
        message: `You've spent ${
          outgoings && outgoings.toFixed(2)
        } £ in total this month!`,
      },
      {
        type: 'incomeAndOutgoings',
        message: `You've earned ${
          income && income.toFixed(2)
        } £ in total this month!`,
      },
    ];
  }

  return [];
}

function calculateInsights(insight) {
  const map = {
    spendByCategory: getSpendingByCategory,
    spendingComparison: getSpendingComparison,
    incomeAndOutgoings: getIncomeAndOutgoings,
    default: () => [],
  };
  return map[insight] || map['default'];
}

function getInsights(transactions, filters) {
  if (!transactions) return [];

  const insights = filters ? filters : allAvailableInsights;

  return insights.map((insight) => calculateInsights(insight)(transactions));
}

export default {
  getInsights,
  calculateInsights,
  getIncomeAndOutgoings,
  getSpendingByCategory,
  getSpendingComparison,
};
