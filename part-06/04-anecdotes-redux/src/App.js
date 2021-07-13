import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = () => {
  return (
    <>
      <h1>Anecdotes-App Redux</h1>
      <AnecdoteList />
      <AnecdoteForm />
    </>
  );
};

export default App;
