import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import React from 'react';
import { ALL_BOOKS } from '../queries';

const Books = ({ show }) => {
  const { loading, data } = useQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  const books = data.allBooks;

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th />
            <th>
              Author
            </th>
            <th>
              Published
            </th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Books.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Books;
