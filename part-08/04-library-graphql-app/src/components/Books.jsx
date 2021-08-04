import PropTypes from 'prop-types';
import React from 'react';

const Books = ({ show }) => {
  if (!show) {
    return null;
  }

  const books = [];

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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
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
