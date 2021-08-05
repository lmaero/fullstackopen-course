import { useMutation, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = ({ show }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const result = useQuery(ALL_AUTHORS);
  const [changeBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    changeBorn({
      variables: {
        name, setBornTo: born,
      }
    });

    setBorn('');
  };

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  function handleSetName(e) {
    setName(e.target.value);
  }

  return (
    <div>
      <h2>Authors</h2>

      <table>
        <tbody>
          <tr>
            <th />
            <th>
              Born
            </th>
            <th>
              Books
            </th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>

      <form onSubmit={submit}>
        <select value={name} onChange={handleSetName}>
          { authors.map((author) => (
            <option key={author.name} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <div>
          Born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>

        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

Authors.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Authors;
