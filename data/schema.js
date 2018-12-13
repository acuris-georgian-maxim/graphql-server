import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const schema = `
type Item {
  id: Int! # the ! means that every object _must_ have an id
  location: String
  type: String
  transactions: [Transaction] # the list of Transactions by this item
}

type Transaction {
  id: Int!
  item: Item
  title: String
  date: String
}

# the schema allows the following query:
type Query {
  transactions: [Transaction]
  item(id: Int!): Item
}

# this schema allows the following mutation:
type Mutation {
  updateTransaction (
    transactionId: Int!
  ): Transaction
}

type Subscription {
  transactionsUpdated: Transaction
}

`;

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
