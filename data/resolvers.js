import { find, filter } from 'lodash';
import { pubsub } from './subscriptions';

const vessels = [
  { id: 1, location: 'Singapore', type: 'Purchase' },
  { id: 2, location: 'Bahamas', type: 'Sell' },
  { id: 3, location: 'Southhampton', type: 'Build' },
  { id: 4, location: 'Aarhus', type: 'Recycle' },
  { id: 5, location: 'Rotterdam', type: 'Recycle' },
  { id: 6, location: 'Hamburg', type: 'Build' },
  { id: 7, location: 'Constanta', type: 'Purchase' },
  { id: 8, location: 'Bangkok', type: 'Purchase' },
  { id: 9, location: 'Bremen', type: 'Purchase' },
  { id: 10, location: 'Singapore', type: 'Purchase' },
  { id: 11, location: 'Piraeus', type: 'Sell' },
  { id: 12, location: 'Valencia', type: 'Sell' },
  { id: 13, location: 'Marseille', type: 'Sell' },
  { id: 14, location: 'Amsterdam', type: 'Sell' },
  { id: 15, location: 'Antwerp', type: 'Sell' },
];

const transactions = [
  { id: 1, vesselId: 1, title: 'Enterprise', date: '01/07/2018' },
  { id: 2, vesselId: 2, title: 'Gyofeng First', date: '01/07/2018' },
  { id: 3, vesselId: 3, title: 'Cape Merlin', date: '01/07/2018' },
  { id: 4, vesselId: 4, title: 'Cape Eagle', date: '01/07/2018' },
  { id: 5, vesselId: 5, title: 'Cape Buzzard', date: '01/07/2018' },
  { id: 6, vesselId: 6, title: 'Enterprise II', date: '01/07/2018' },
  { id: 7, vesselId: 7, title: 'Langham', date: '01/07/2018' },
  { id: 8, vesselId: 8, title: 'Cape Perry', date: '01/07/2018' },
  { id: 9, vesselId: 9, title: 'Hanns', date: '01/07/2018' },
  { id: 10, vesselId: 10, title: 'Apple', date: '01/31/2018' },
  { id: 11, vesselId: 11, title: 'Deep Water', date: '01/10/2018' },
  { id: 12, vesselId: 12, title: 'No Name', date: '01/15/2018' },
  { id: 13, vesselId: 13, title: 'Seaguls', date: '02/16/2018' },
  { id: 14, vesselId: 14, title: 'Cape Ryman', date: '04/06/2018' },
  { id: 15, vesselId: 15, title: 'Page Down', date: '11/08/2018' },
];

const resolveFunctions = {
  Query: {
    transactions() {
      return transactions;
    },
    vessels(_, { id }) {
      return find(vessels, { id });
    },
  },
  Mutation: {
    updateTransaction(_, { transactionId }) {
      const data = find(transactions, { id: transactionId });
      if (!data) {
        throw new Error(`Couldn't find data with id ${transactionId}`);
      }
      data.date = new Date('01/07/2018');
      pubsub.publish('transactionsUpdated', data);
      return data;
    },
  },
  Subscription: {
    transactionsUpdated(transaction) {
      return transaction;
    },
  },
  Vessel: {
    transactions(vessel) {
      return filter(transactions, { vesselId: vessel.id });
    },
  },
  Transaction: {
    vessel(transaction) {
      return find(vessels, { id: transaction.vesselId });
    },
  },
};

export default resolveFunctions;
