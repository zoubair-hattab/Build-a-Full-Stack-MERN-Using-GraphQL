import Transaction from '../models/transaction.model.js';
import { verifyUser } from '../utils/verifyUser.js';

const transactionResolver = {
  Query: {
    transactions: async (_, __, { req }) => {
      try {
        const user = await verifyUser(req);
        if (!user) {
          return new Error('You are not authenticated.');
        }
        const transactions = await Transaction.find({
          userId: user._id,
        }).populate('userId');
        return transactions;
      } catch (err) {
        console.error('Error getting transactions:', err);
        throw new Error('Error getting transactions');
      }
    },
    transaction: async (_, { transactionId }, { req }) => {
      try {
        const user = await verifyUser(req);
        if (!user) {
          return new Error('You are not authenticated.');
        }
        const transaction = await Transaction.findOne({
          _id: transactionId,
          userId: user._id,
        }).populate('userId');
        if (!transaction) {
          return new Error(
            `There is no transaction under this ${transactionId}`
          );
        }
        return transaction;
      } catch (error) {
        return new Error('Error getting transactions');
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, { req }) => {
      const user = await verifyUser(req);
      if (!user) {
        return new Error('You are not authenticated.');
      }
      const newTransaction = new Transaction({
        ...input,
        userId: user?._id,
      });
      await newTransaction.save();
      return newTransaction;
    },
    updateTransaction: async (_, { input }, { req }) => {
      console.log(input);
      const user = await verifyUser(req);
      if (!user) {
        return new Error('You are not authenticated.');
      }
      const transaction = await Transaction.findOneAndUpdate(
        { _id: input.transactionId, userId: user?._id },
        {
          $set: {
            ...input,
          },
        },
        { new: true }
      );
      return transaction;
    },
    deleteTransaction: async (_, { transactionId }, { req }) => {
      console.log(transactionId);
      const user = await verifyUser(req);
      if (!user) {
        return new Error('User is not authenticated.');
      }
      const transaction = await Transaction.findOneAndDelete({
        _id: transactionId,
        userId: user._id,
      });
      return transaction;
    },
  },
};
export default transactionResolver;
