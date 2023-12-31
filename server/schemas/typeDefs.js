const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: String
    savedBooks: [Book!]
  }

  type Book {
    bookId: Int!
    authors: String!
    description: String!
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query {
    me: [User]
  }

  type Mutation {
    login:(username: String!, password: String!): Auth
    addUser:(username: String!, password: String!): Auth
    saveBook:(book: Book!): User
    removeBook:(bookId: Book!): User
  }
`;

module.exports = typeDefs;