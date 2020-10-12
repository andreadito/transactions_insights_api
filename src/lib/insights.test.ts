import test from 'ava';

import fakeDB from '../fakeDB';

import { getIncomeAndOutgoings } from './insights';

test('getIncomeAndOutgoings', (t) => {
  t.is(
    getIncomeAndOutgoings(
      fakeDB.getTransactionsByCustomerId('customerID1')
    ),
    []
  );
});
