import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ALL_BOOKS } from '../queries';

const Books = ({ show }) => {
  const [books, setBooks] = useState([]);
  const { data, loading } = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks);
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

  const allGenres = data.allBooks
    .map((book) => book.genres)
    .reduce((acc, curr) => acc.concat(curr), []);

  const uniqueGenres = [...new Set(allGenres)];

  function filterByGenres(genre) {
    if (!genre) {
      setBooks(data.allBooks);
      return;
    }

    const filteredByGenre = data.allBooks
      .filter((book) => book.genres.includes(genre));

    setBooks(filteredByGenre);
  }

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

      <h3>Filter by genre</h3>
      <button
        type="button"
        onClick={() => filterByGenres()}
      >
        All
      </button>

      { uniqueGenres.map((genre) => (
        <button
          type="button"
          key={genre}
          onClick={() => filterByGenres(genre)}
        >
          { genre[0].toUpperCase() + genre.slice(1) }
        </button>
      ))}
    </div>
  );
};

Books.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Books;
