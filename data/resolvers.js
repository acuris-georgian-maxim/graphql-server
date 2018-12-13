import { find, filter } from 'lodash';
import { pubsub } from './subscriptions';

const item = [
  { id: 1, location: 'Apple Store', type: 'Purchase' },
  { id: 2, location: 'Apple Store', type: 'Repair' },
  { id: 3, location: 'Selfridges', type: 'Purchase' },
  { id: 4, location: 'Home', type: 'Recycle' },
  { id: 5, location: 'Tesco', type: 'Recycle' },
  { id: 6, location: 'Homebase', type: 'Build' },
  { id: 7, location: 'Fred Perry Shop', type: 'Purchase' },
  { id: 8, location: 'Fornasetti', type: 'Purchase' },
  { id: 9, location: 'Spotify', type: 'Purchase' },
  { id: 10, location: 'Netflix.com', type: 'Purchase' },
  { id: 11, location: 'Gumtree', type: 'Sell' },
  { id: 12, location: 'eBay', type: 'Sell' },
  { id: 13, location: 'Christie`s', type: 'Sell' },
  { id: 14, location: 'Sothesby`s', type: 'Sell' },
  { id: 15, location: 'eBay', type: 'Sell' },
];

const transactions = [
  { id: 1, itemId: 1, title: 'iPhone XS', date: '01/07/2018' },
  { id: 2, itemId: 2, title: 'MacBook Pro 15 inch', date: '01/07/2018' },
  { id: 3, itemId: 3, title: 'Tom Ford scarf', date: '01/07/2018' },
  { id: 4, itemId: 4, title: '700g bread', date: '01/07/2018' },
  { id: 5, itemId: 5, title: '1kg bananas', date: '01/07/2018' },
  { id: 6, itemId: 6, title: 'Christmas tree', date: '01/07/2018' },
  { id: 7, itemId: 7, title: 'Fred Perry bag', date: '01/07/2018' },
  { id: 8, itemId: 8, title: 'Candle', date: '01/07/2018' },
  { id: 9, itemId: 9, title: 'Spotify subscription', date: '01/07/2018' },
  { id: 10, itemId: 10, title: 'Netflix subscription', date: '01/31/2018' },
  { id: 11, itemId: 11, title: 'Chair', date: '01/10/2018' },
  { id: 12, itemId: 12, title: 'Wardrobe', date: '01/15/2018' },
  { id: 13, itemId: 13, title: 'Painting', date: '02/16/2018' },
  { id: 14, itemId: 14, title: 'Handbag', date: '04/06/2018' },
  { id: 15, itemId: 15, title: 'Car', date: '11/08/2018' },
];

const resolveFunctions = {
  Query: {
    transactions() {
      return transactions;
    },
    item(_, { id }) {
      return find(item, { id });
    },
  },
  Mutation: {
    updateTransaction(_, { transactionId }) {
      const item = find(transactions, { id: transactionId });
      if (!item) {
        throw new Error(`Couldn't find item with id ${transactionId}`);
      }
      item.date = new Date('01/07/2018');
      pubsub.publish('transactionsUpdated', item);
      return item;
    },
  },
  Subscription: {
    transactionsUpdated(transaction) {
      return transaction;
    },
  },
  Item: {
    transactions(item) {
      return filter(transactions, { itemId: item.id });
    },
  },
  Transaction: {
    item(transaction) {
      return find(item, { id: transaction.itemId });
    },
  },
};

export default resolveFunctions;
