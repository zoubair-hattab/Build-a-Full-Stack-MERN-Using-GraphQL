import { users } from '../dummyData/data.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Transaction from '../models/transaction.model.js';

import { verifyUser } from '../utils/verifyUser.js';
const userResolver = {
  Query: {
    authUser: async (_, ___, { req }) => {
      try {
        const user = await verifyUser(req);
        if (!user) {
          return new Error('You are not authenticated.');
        }
        return user;
      } catch (error) {
        return new Error(error.message);
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        return new Error('You are not authenticated.');
      }
    },
  },

  Mutation: {
    signUp: async (_, { input }) => {
      try {
        const { username, name, password, gender } = input;
        if (!username || !name || !password || !gender) {
          return new Error('All fields are required.');
        }
        const user = await User.findOne({ username });
        if (user) {
          return new Error('Username already exist.');
        }
        const passwordHash = bcryptjs.hashSync(password, 12);
        const newUser = new User({
          username,
          name,
          password: passwordHash,
          gender,
        });
        const savedUser = await newUser.save();
        const { password: pass, ...rest } = savedUser._doc;
        return rest;
      } catch (err) {
        return new Error(err.message || 'Internal server error');
      }
    },
    login: async (_, { input }, { req, res }) => {
      const { username, password } = input;
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error('User is not exist.');
        }
        const isSame = bcryptjs.compareSync(password, user.password);
        if (!isSame) {
          throw new Error('There is an error in your credentials.');
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
          expiresIn: '1d',
        });
        res.cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'Strict',
        });

        return user;
      } catch (err) {
        return new Error(err.message || 'Internal server error');
      }
    },

    logout: async (_, __, { res }) => {
      try {
        res.clearCookie('token');
        return { message: 'Logged out successfully' };
      } catch (error) {
        return new Error(err.message || 'Internal server error');
      }
    },
  },
  User: {
    transactions: async (parent) => {
      try {
        const transactions = await Transaction.find({ userId: parent._id });
        return transactions;
      } catch (error) {
        return new Error(error.message);
      }
    },
  },
};
export default userResolver;
