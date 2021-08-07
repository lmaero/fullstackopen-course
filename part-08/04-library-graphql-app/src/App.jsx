import { useApolloClient, useSubscription } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import RecommendedBooks from './components/RecommendedBooks';
import { ALL_BOOKS, BOOK_ADDED } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'));
  }, [token]);

  const updateCacheWith = (addedBook) => {
    console.log(addedBook);
    const includedIn = (set, object) => set.map((b) => b.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      // eslint-disable-next-line no-alert
      window.alert(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    }
  });

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
                onClick={() => setPage('recommended-books')}
              >
                Recommended
              </button>

              <button
                type="button"
                onClick={logout}
              >
                Logout
              </button>

              <NewBook
                show={page === 'add'}
                setPage={setPage}
                updateCacheWith={updateCacheWith}
              />

              <RecommendedBooks show={page === 'recommended-books'} />
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
