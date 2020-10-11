import { isThisMonth, sub } from 'date-fns';
import faker from 'faker';

export type Transaction = {
  readonly customerID: string;
  readonly amount: number;
  readonly date: string;
  readonly description: string;
  readonly category: string;
  readonly type: string;
  readonly merchantSender: string
};

const generateFakeDB = (size) => {
  const emptyArray = new Array(size);
  emptyArray.fill({});

  const customer1 = emptyArray.map(() => ({
    customerID: 'customerID1',
    amount: faker.finance.amount(),
    date: faker.date.between(sub(new Date, {months: 3}), new Date()),
    description: faker.finance.transactionDescription(),
    category: faker.random.arrayElement(['shopping', 'general', 'eating out', 'transport', 'bills', 'groceries', 'entertainment']),
    type: faker.random.arrayElement(['in', 'out']),
    merchantSender: faker.company.companyName()
  }))
  const customer2 = emptyArray.map(() => ({
    customerID: 'customerID2',
    amount: faker.finance.amount(),
    date: faker.date.between(sub(new Date, {months: 3}), new Date()),
    description: faker.finance.transactionDescription(),
    category: faker.random.arrayElement(['shopping', 'general', 'eating out', 'transport', 'bills', 'groceries', 'entertainment']),
    type: faker.random.arrayElement(['in', 'out']),
    merchantSender: faker.company.companyName()
  }))
  const customer3 = emptyArray.map(() => ({
    customerID: 'customerID3',
    amount: faker.finance.amount(),
    date: faker.date.between(sub(new Date, {months: 3}), new Date()),
    description: faker.finance.transactionDescription(),
    category: faker.random.arrayElement(['shopping', 'general', 'eating out', 'transport', 'bills', 'groceries', 'entertainment']),
    type: faker.random.arrayElement(['in', 'out']),
    merchantSender: faker.company.companyName()
  }))

  return [...customer1, ...customer2, ...customer3];
};
const fakeDB = () => {
  const db = generateFakeDB(50);
  return {
    getTransactionsByCustomerId: (customerID) => {
      return db.filter((entry) => entry.customerID === customerID);
    },
    getTransactionsByCustomerIdOfThisMonth: (customerId) => {
      return db.filter((entry) => entry.customerID === customerId && isThisMonth(Date.parse(entry.date)))
    }
  }
};

export default fakeDB();
