import { gql } from '@apollo/client';

const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      bookCount
      born
    }
  }
`;

export default ALL_AUTHORS;
