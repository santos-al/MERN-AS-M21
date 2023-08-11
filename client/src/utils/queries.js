const { gql } = require('apollo-server-express');

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookID
        title
      }
    }
  }
`;