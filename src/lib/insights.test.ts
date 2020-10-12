import insights from './insights';

import { Transaction } from '../fakeDB';
import { subMonths } from 'date-fns';

describe('insights lib', () => {
  describe('getSpendingByCategory', () => {
    it('should return an array of insights if transactions are from this month', () => {
      const transactions: Transaction[] = [
        {
          customerID: 'customerID1',
          amount: 895.93,
          date: new Date().toISOString(),
          description:
            'withdrawal transaction at Kerluke Group using card ending with ***1100 for UZS 91.35 in account ***76814308',
          category: 'eating out',
          type: 'in',
          merchantSender: 'Boyer, Koepp and Gislason',
        },
        {
          customerID: 'customerID1',
          amount: 300,
          date: new Date().toISOString(),
          description:
            'withdrawal transaction at Kerluke Group using card ending with ***1100 for UZS 91.35 in account ***76814308',
          category: 'eating out',
          type: 'in',
          merchantSender: 'Boyer, Koepp and Gislason',
        },
        {
          customerID: 'customerID1',
          amount: 720.06,
          date: new Date().toDateString(),
          description:
            'invoice transaction at Zieme - Farrell using card ending with ***0957 for DJF 595.24 in account ***10044712',
          category: 'eating out',
          type: 'out',
          merchantSender: 'Herzog - Shields',
        },
        {
          customerID: 'customerID1',
          amount: 766.41,
          date: new Date().toISOString(),
          description:
            'payment transaction at Hessel, Jast and Ritchie using card ending with ***2571 for VND 666.61 in account ***63287726',
          category: 'entertainment',
          type: 'out',
          merchantSender: "D'Amore - Cremin",
        },
      ];
      const results = insights.getSpendingByCategory(transactions);
      const expected = [
        {
          type: 'spendByCategory',
          message: `You've spent 720.06 £ at eating out this month`,
        },
        {
          type: 'spendByCategory',
          message: `You've spent 766.41 £ at entertainment this month`,
        },
      ];
      expect(results).toStrictEqual(expected);
    });
    it('should return an empty array of insights if transactions are not from this month', () => {
      const transactions: Transaction[] = [
        {
          customerID: 'customerID1',
          amount: 895.93,
          date: '2020-07-28T15:56:30.066Z',
          description:
            'withdrawal transaction at Kerluke Group using card ending with ***1100 for UZS 91.35 in account ***76814308',
          category: 'eating out',
          type: 'in',
          merchantSender: 'Boyer, Koepp and Gislason',
        },
        {
          customerID: 'customerID1',
          amount: 300,
          date: '2020-07-28T15:56:30.066Z',
          description:
            'withdrawal transaction at Kerluke Group using card ending with ***1100 for UZS 91.35 in account ***76814308',
          category: 'eating out',
          type: 'in',
          merchantSender: 'Boyer, Koepp and Gislason',
        },
        {
          customerID: 'customerID1',
          amount: 720.06,
          date: '2020-07-28T15:56:30.066Z',
          description:
            'invoice transaction at Zieme - Farrell using card ending with ***0957 for DJF 595.24 in account ***10044712',
          category: 'eating out',
          type: 'out',
          merchantSender: 'Herzog - Shields',
        },
        {
          customerID: 'customerID1',
          amount: 766.41,
          date: '2020-07-28T15:56:30.066Z',
          description:
            'payment transaction at Hessel, Jast and Ritchie using card ending with ***2571 for VND 666.61 in account ***63287726',
          category: 'entertainment',
          type: 'out',
          merchantSender: "D'Amore - Cremin",
        },
      ];
      const results = insights.getSpendingByCategory(transactions);
      const expected = [];
      expect(results).toStrictEqual(expected);
    });
    it('should return an empty array if empty ', () => {
      const transactions: Transaction[] = [];
      const results = insights.getSpendingByCategory(transactions);
      const expected = [];
      expect(results).toStrictEqual(expected);
    });
    it('should return an empty array if null ', () => {
      const transactions = null;
      const results = insights.getSpendingByCategory(transactions);
      const expected = [];
      expect(results).toStrictEqual(expected);
    });
  });
  describe('getSpendingComparison', () => {
    it('should return an array of insights if you spend more', () => {
      const transactions: Transaction[] = [
        {
          customerID: 'customerID1',
          amount: 895.93,
          date: new Date().toISOString(),
          description:
            'withdrawal transaction at Kerluke Group using card ending with ***1100 for UZS 91.35 in account ***76814308',
          category: 'eating out',
          type: 'out',
          merchantSender: 'Boyer, Koepp and Gislason',
        },
        {
          customerID: 'customerID1',
          amount: 300,
          date: subMonths(new Date(), 1).toISOString(),
          description:
            'withdrawal transaction at Kerluke Group using card ending with ***1100 for UZS 91.35 in account ***76814308',
          category: 'eating out',
          type: 'out',
          merchantSender: 'Boyer, Koepp and Gislason',
        },
        {
          customerID: 'customerID1',
          amount: 720.06,
          date: subMonths(new Date(), 1).toISOString(),
          description:
            'invoice transaction at Zieme - Farrell using card ending with ***0957 for DJF 595.24 in account ***10044712',
          category: 'eating out',
          type: 'out',
          merchantSender: 'Herzog - Shields',
        },
        {
          customerID: 'customerID1',
          amount: 766.41,
          date: new Date().toISOString(),
          description:
            'payment transaction at Hessel, Jast and Ritchie using card ending with ***2571 for VND 666.61 in account ***63287726',
          category: 'entertainment',
          type: 'out',
          merchantSender: "D'Amore - Cremin",
        },
      ];
      const results = insights.getSpendingComparison(transactions);
      const expected = [
        {
          type: 'spendingComparison',
          message: `You've spent 62.96% more the previous month!`,
        },
      ];
      expect(results).toStrictEqual(expected);
    });
    it('should return an array of insights if you spend less', () => {
      const transactions: Transaction[] = [
        {
          customerID: 'customerID1',
          amount: 895.93,
          date: new Date().toISOString(),
          description:
            'withdrawal transaction at Kerluke Group using card ending with ***1100 for UZS 91.35 in account ***76814308',
          category: 'eating out',
          type: 'out',
          merchantSender: 'Boyer, Koepp and Gislason',
        },
        {
          customerID: 'customerID1',
          amount: 300,
          date: subMonths(new Date(), 1).toISOString(),
          description:
            'withdrawal transaction at Kerluke Group using card ending with ***1100 for UZS 91.35 in account ***76814308',
          category: 'eating out',
          type: 'out',
          merchantSender: 'Boyer, Koepp and Gislason',
        },
        {
          customerID: 'customerID1',
          amount: 720.06,
          date: subMonths(new Date(), 1).toISOString(),
          description:
            'invoice transaction at Zieme - Farrell using card ending with ***0957 for DJF 595.24 in account ***10044712',
          category: 'eating out',
          type: 'out',
          merchantSender: 'Herzog - Shields',
        },
        {
          customerID: 'customerID1',
          amount: 766.41,
          date: subMonths(new Date(), 1).toISOString(),
          description:
            'payment transaction at Hessel, Jast and Ritchie using card ending with ***2571 for VND 666.61 in account ***63287726',
          category: 'entertainment',
          type: 'out',
          merchantSender: "D'Amore - Cremin",
        },
      ];
      const results = insights.getSpendingComparison(transactions);
      const expected = [
        {
          type: 'spendingComparison',
          message: `You've spent 49.85% less the previous month!`,
        },
      ];
      expect(results).toStrictEqual(expected);
    });
    it('should return an empty array if empty ', () => {
      const transactions: Transaction[] = [];
      const results = insights.getSpendingComparison(transactions);
      const expected = [];
      expect(results).toStrictEqual(expected);
    });
    it('should return an empty array if null ', () => {
      const transactions = null;
      const results = insights.getSpendingComparison(transactions);
      const expected = [];
      expect(results).toStrictEqual(expected);
    });
  });
  describe('getIncomeAndOutgoings', () => {
    it('should return an array of insights if transaction are from this month', () => {
      const transactions: Transaction[] = [
        {
          customerID: 'customerID1',
          amount: 895.93,
          date: new Date().toISOString(),
          description:
            'withdrawal transaction at Kerluke Group using card ending with ***1100 for UZS 91.35 in account ***76814308',
          category: 'eating out',
          type: 'in',
          merchantSender: 'Boyer, Koepp and Gislason',
        },
        {
          customerID: 'customerID1',
          amount: 300,
          date: new Date().toISOString(),
          description:
            'withdrawal transaction at Kerluke Group using card ending with ***1100 for UZS 91.35 in account ***76814308',
          category: 'eating out',
          type: 'in',
          merchantSender: 'Boyer, Koepp and Gislason',
        },
        {
          customerID: 'customerID1',
          amount: 720.06,
          date: new Date().toDateString(),
          description:
            'invoice transaction at Zieme - Farrell using card ending with ***0957 for DJF 595.24 in account ***10044712',
          category: 'eating out',
          type: 'out',
          merchantSender: 'Herzog - Shields',
        },
        {
          customerID: 'customerID1',
          amount: 766.41,
          date: new Date().toISOString(),
          description:
            'payment transaction at Hessel, Jast and Ritchie using card ending with ***2571 for VND 666.61 in account ***63287726',
          category: 'entertainment',
          type: 'out',
          merchantSender: "D'Amore - Cremin",
        },
      ];
      const results = insights.getIncomeAndOutgoings(transactions);
      const expected = [
        {
          type: 'incomeAndOutgoings',
          message: `You've spent 1486.47 £ in total this month!`,
        },
        {
          type: 'incomeAndOutgoings',
          message: `You've earned 1195.93 £ in total this month!`,
        },
      ];
      expect(results).toStrictEqual(expected);
    });
    it('should return empty array if transaction are not from this month', () => {
      const transactions: Transaction[] = [
        {
          customerID: 'customerID1',
          amount: 895.93,
          date: '2020-07-28T15:56:30.066Z',
          description:
            'withdrawal transaction at Kerluke Group using card ending with ***1100 for UZS 91.35 in account ***76814308',
          category: 'eating out',
          type: 'in',
          merchantSender: 'Boyer, Koepp and Gislason',
        },
        {
          customerID: 'customerID1',
          amount: 300,
          date: '2020-07-28T15:56:30.066Z',
          description:
            'withdrawal transaction at Kerluke Group using card ending with ***1100 for UZS 91.35 in account ***76814308',
          category: 'eating out',
          type: 'in',
          merchantSender: 'Boyer, Koepp and Gislason',
        },
        {
          customerID: 'customerID1',
          amount: 720.06,
          date: '2020-07-28T15:56:30.066Z',
          description:
            'invoice transaction at Zieme - Farrell using card ending with ***0957 for DJF 595.24 in account ***10044712',
          category: 'eating out',
          type: 'out',
          merchantSender: 'Herzog - Shields',
        },
        {
          customerID: 'customerID1',
          amount: 766.41,
          date: '2020-07-28T15:56:30.066Z',
          description:
            'payment transaction at Hessel, Jast and Ritchie using card ending with ***2571 for VND 666.61 in account ***63287726',
          category: 'entertainment',
          type: 'out',
          merchantSender: "D'Amore - Cremin",
        },
      ];
      const results = insights.getIncomeAndOutgoings(transactions);
      const expected = [];
      expect(results).toStrictEqual(expected);
    });
    it('should return an empty array if empty ', () => {
      const transactions: Transaction[] = [];
      const results = insights.getIncomeAndOutgoings(transactions);
      const expected = [];
      expect(results).toStrictEqual(expected);
    });
    it('should return an empty array if null ', () => {
      const transactions = null;
      const results = insights.getIncomeAndOutgoings(transactions);
      const expected = [];
      expect(results).toStrictEqual(expected);
    });
  });
  describe('getInsights', () => {
    const transactions: Transaction[] = [
      {
        customerID: 'customerID1',
        amount: 895.93,
        date: new Date().toISOString(),
        description:
          'withdrawal transaction at Kerluke Group using card ending with ***1100 for UZS 91.35 in account ***76814308',
        category: 'eating out',
        type: 'in',
        merchantSender: 'Boyer, Koepp and Gislason',
      },
      {
        customerID: 'customerID1',
        amount: 300,
        date: new Date().toISOString(),
        description:
          'withdrawal transaction at Kerluke Group using card ending with ***1100 for UZS 91.35 in account ***76814308',
        category: 'eating out',
        type: 'in',
        merchantSender: 'Boyer, Koepp and Gislason',
      },
      {
        customerID: 'customerID1',
        amount: 720.06,
        date: new Date().toDateString(),
        description:
          'invoice transaction at Zieme - Farrell using card ending with ***0957 for DJF 595.24 in account ***10044712',
        category: 'eating out',
        type: 'out',
        merchantSender: 'Herzog - Shields',
      },
      {
        customerID: 'customerID1',
        amount: 766.41,
        date: new Date().toISOString(),
        description:
          'payment transaction at Hessel, Jast and Ritchie using card ending with ***2571 for VND 666.61 in account ***63287726',
        category: 'entertainment',
        type: 'out',
        merchantSender: "D'Amore - Cremin",
      },
    ];
    const getIncomeAndOutgoingsSpy = jest.spyOn(
      insights,
      'getIncomeAndOutgoings'
    );
    const getSpendingByCategorySpy = jest.spyOn(
      insights,
      'getSpendingByCategory'
    );
    const getSpendingComparisonSpy = jest.spyOn(
      insights,
      'getSpendingComparison'
    );

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call all the allowed insights and return an array of results', () => {
      insights.getInsights(transactions, null);
      expect(getIncomeAndOutgoingsSpy).toHaveBeenCalled();
      expect(getSpendingByCategorySpy).toHaveBeenCalled();
      expect(getSpendingComparisonSpy).toHaveBeenCalled();
    });
  });
});
