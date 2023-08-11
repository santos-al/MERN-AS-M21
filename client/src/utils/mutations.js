const { gql } = require('apollo-server-express');

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($book: Book!) {
    saveBook(book: $book) {
        bookId
        authors
        description
        title
        image
        link
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
    }
  }
`;
