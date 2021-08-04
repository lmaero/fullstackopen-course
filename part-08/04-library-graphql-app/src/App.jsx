import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

const App = () => {
  const [page, setPage] = useState('authors');

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => setPage('authors')}
        >
          Authors
        </button>

        <button
          type="button"
          onClick={() => setPage('books')}
        >
          Books
        </button>

        <button
          type="button"
          onClick={() => setPage('add')}
        >
          Add book
        </button>
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />

    </div>
  );
};

export default App;
