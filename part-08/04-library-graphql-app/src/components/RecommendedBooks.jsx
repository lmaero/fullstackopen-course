import { useLazyQuery, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ALL_BOOKS, ME } from '../queries';

const RecommendedBooks = ({ show }) => {
  const loggedInUser = useQuery(ME);
  const [getFavoriteBooks, { data }] = useLazyQuery(ALL_BOOKS);
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    if (data) {
      setFavoriteBooks(data.allBooks);
    }
  }, [setFavoriteBooks, data]);

  useEffect(() => {
    if (loggedInUser.data) {
      const { favoriteGenre } = loggedInUser.data.me;
      getFavoriteBooks({ variables: { genres: favoriteGenre } });
    }
  }, [getFavoriteBooks, loggedInUser]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Recommendations</h2>

      <p>
        Books in your favorite genre
        {' '}
        <b>{loggedInUser ? loggedInUser.data.me.favoriteGenre : '' }</b>
      </p>

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
          {favoriteBooks.map((book) => (
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

RecommendedBooks.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default RecommendedBooks;
