import { useApolloClient } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'));
  }, [token]);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('authors');
  };

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

        { token
          ? (
            <>
              <button
                type="button"
                onClick={() => setPage('add')}
              >
                Add book
              </button>
              <button
                type="button"
                onClick={logout}
              >
                Logout
              </button>

              <NewBook show={page === 'add'} setPage={setPage} />
            </>
          )
          : (
            <>
              <button
                type="button"
                onClick={() => setPage('login')}
              >
                Login
              </button>

            </>
          ) }
        <Authors
          show={page === 'authors'}
          token={token}
        />

        <Books show={page === 'books'} />

        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setPage={setPage}
        />

      </div>

    </div>
  );
};

export default App;
