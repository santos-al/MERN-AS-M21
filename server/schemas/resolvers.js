const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('books');
        }
        throw new AuthenticationError('You need to be logged in');
      },
  },

  Mutation: {
    addUser: async (parent, { username, email, password}) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials ');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    // saves a new book
    saveBook: async (parent, { user, body }, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: user._id },
              { $addToSet: { savedBooks: body } },
              { new: true, runValidators: true }
            );
            return updatedUser
        }
        throw new AuthenticationError("You need to be logged in");
    },

    //   removes a book
    removeBook: async (parent, { user, params }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedBooks: { bookId: params.bookId } } },
            { new: true }
          );
          return updatedUser
        }
        throw new AuthenticationError('You need to be logged in');
    }
  }
};

module.exports = resolvers;
