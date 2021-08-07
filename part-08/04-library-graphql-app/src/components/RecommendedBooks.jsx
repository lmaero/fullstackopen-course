import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ALL_BOOKS, ME } from '../queries';

const RecommendedBooks = ({ show }) => {
  const [books, setBooks] = useState([]);
  const { data, loading } = useQuery(ALL_BOOKS);
  const { data: userData } = useQuery(ME);

  useEffect(() => {
    if (data && userData) {
      const { allBooks } = data;
      const { favoriteGenre } = userData.me;

      const filteredByFavoriteGenre = allBooks
        .filter((book) => book.genres.includes(favoriteGenre.toLowerCase()));

      setBooks(filteredByFavoriteGenre);
    }
  }, [data]);

  if (!show) {
    return null;
  }

  if (loading) {
    return (
      <>
        <h2>Books</h2>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <div>
      <h2>Recommendations</h2>

      <p>
        Books in your favorite genre
        {' '}
        <b>{userData ? userData.me.favoriteGenre : '' }</b>
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

RecommendedBooks.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default RecommendedBooks;
