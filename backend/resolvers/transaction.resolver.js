import Transaction from '../models/transaction.model.js';
import User from '../models/user.model.js';
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
        });
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
        });
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
    categoryStatistics: async (_, __, { req }) => {
      const user = await verifyUser(req);
      if (!user) {
        return new Error('You are not authenticated.');
      }
      const userId = user?._id;
      const transactions = await Transaction.find({ userId });
      const categoryMap = {};

      transactions.forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        categoryMap[transaction.category] += transaction.amount;
      });

      return Object.entries(categoryMap).map(([category, totalAmount]) => ({
        category,
        totalAmount,
      }));
    },
  },
  Transaction: {
    user: async ({ userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        return new Error(error.message);
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
